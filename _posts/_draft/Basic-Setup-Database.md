```python
import pymysql.cursors
import pandas as pd

with open("env","r") as file:
    secret = file.readline()

class Config:
    MYSQL_HOST = 'db4free.net'
    MYSQL_PORT = 3306
    MYSQL_USER = ''#User Name secret[3:11].strip()
    MYSQL_PASSWORD = ''#Password secret[17:25].strip()
    MYSQL_DB = ''#Database Name
    MYSQL_CHARSET = 'utf8mb4'

def get_data_from_db():

    # Connect to the database
    connection = pymysql.connect(host=Config.MYSQL_HOST,
                                port=Config.MYSQL_PORT,
                                user=Config.MYSQL_USER,
                                password=Config.MYSQL_PASSWORD,
                                db=Config.MYSQL_DB,
                                charset=Config.MYSQL_CHARSET,
                                cursorclass=pymysql.cursors.DictCursor)

    with connection.cursor() as cursor:
        # Read a single record
        sql = "SELECT * from online_retail"
        cursor.execute(sql)
        result_retail = cursor.fetchall()


    retail = pd.DataFrame(result_retail)
    retail['InvoiceTimestamp'] = retail['InvoiceDate']
    retail['InvoiceDate'] = pd.to_datetime(retail['InvoiceDate']).dt.date
    retail.to_csv("/home/airflow/gcs/data/retail_from_db.csv", index=False)
```

```python
import sqlalchemy
from sqlalchemy import create_engine

def db_con(config:configparser.ConfigParser,db:str,stage:str) -> tuple[sqlalchemy.engine.base.Connection,sqlalchemy.engine.base.Engine]:
    """Create connection to database

    Args:
        config (configparser.ConfigParser): config from "config.ini" file
        db (str): mysql or snw(Snowflake)
        stage (str): local/test/prod server

    Returns:
        conn(sqlalchemy.engine.base.Connection): Connection to database
        engine(sqlalchemy.engine.base.Engine): engine to database
    """
    # read host config from "config.ini" file
    server = config[f'{db}.{stage}']['server']
    username = config[f'{db}.{stage}']['username']
    password = config[f'{db}.{stage}']['password']
    schema = config[f'{db}.{stage}']['schema']
    charset = config[f'{db}.{stage}']['charset']
    
    
    engine = create_engine(f'mysql+pymysql://{username}:{password}@{server}/{schema}?charset={charset}')
    conn = engine.connect()
    return conn,engine

def db_dis(conn:sqlalchemy.engine.base.Connection, engine:sqlalchemy.engine.base.Engine):
    """
    Close the connection to the database and dispose the engine.

    Parameters:
    conn (connection): The connection to the database.
    engine (SQLAlchemy engine): The engine used to connect to the database.

    Returns:
        None
    """
    conn.close()
    engine.dispose()

def read_query(config:configparser.ConfigParser,db:str,stage:str,sql:str) -> pd.core.frame.DataFrame:
    """
    Execute a SQL query and return the result as a pandas DataFrame.
    Ex. Select * from "Table_Name";
        Delete "Table_Name";

    Args:
        config (configparser.ConfigParser): The configuration object containing the database connection details.
        db (str): The name of the database to be connected.
        stage (str): The stage environment to connect to.
        sql (str): The SQL query to be executed.

    Returns:
        pd.core.frame.DataFrame: The result of the SQL query as a pandas DataFrame.
    """
    conn,engine = db_con(config,db,stage)
    df= pd.read_sql(sql, con=conn)
    db_dis(conn,engine)
    return df


def execute_query(config:configparser.ConfigParser,db:str,stage:str,sql:str) -> None:
    """   
    Execute a SQL query but not return the result.
    Ex. USE "Database_Name";
        Delete "Table_Name";
        
    
    Args:
        config (configparser.ConfigParser): The configuration object containing the database connection details.
        db (str): The name of the database to be connected.
        stage (str): The stage environment to connect to.
        sql (str): The SQL query to be executed.
        
    Returns:
        None
    """
    conn,engine = db_con(config,db,stage)
    conn.execute(sql)
    db_dis(conn,engine)
    
def to_query(config:configparser.ConfigParser,db:str,stage:str,df:pd.core.frame.DataFrame,schema:str,table:str,type:str) -> None:
    """
    This function takes in a ConfigParser object, a database name, a stage name, a DataFrame object, a schema name, a table name, and a type.
    It establishes a database connection and engine using the db_con function.
    It then uses the to_sql method to write the DataFrame to a SQL table.
    Finally, it closes the database connection and engine using the db_dis function.

    Args:
        config (configparser.ConfigParser): The configuration object containing the database connection details.
        db (str): The name of the database to be connected.
        stage (str): The stage environment to connect to.
        df (pd.core.frame.DataFrame): The DataFrame object for written to the table.
        schema (_type_): The schema name of the table.
        table (_type_): The name of the table.
        type (_type_): The behavior if the table already exists. Possible values are 'fail', 'replace', and 'append'.

    Returns:
        None
    """
    conn,engine = db_con(config,db,stage)
    df.to_sql(table, engine,schema=schema, if_exists=type, index=False,chunksize=None)
    db_dis(conn,engine)
```

```python
import logging


from pyspark.sql import SparkSession
from pyspark.sql.functions import from_json, col
from pyspark.sql.types import StructType, StructField, StringType

# from pyspark.streaming.context import *
import sqlalchemy
from sqlalchemy import create_engine
import configparser
from datetime import datetime

config = configparser.ConfigParser(allow_no_value=True)
config.read('config.ini', "utf8")

def db_con(config:configparser.ConfigParser,db:str,stage:str) -> tuple[sqlalchemy.engine.base.Connection,sqlalchemy.engine.base.Engine]:
    """Create connection to database

    Args:
        config (configparser.ConfigParser): config from "config.ini" file
        db (str): mysql or snw(Snowflake)
        stage (str): local/test/prod server

    Returns:
        conn(sqlalchemy.engine.base.Connection): Connection to database
        engine(sqlalchemy.engine.base.Engine): engine to database
    """
    # read host config from "config.ini" file
    server = config[f'{db}.{stage}']['server']
    username = config[f'{db}.{stage}']['username']
    password = config[f'{db}.{stage}']['password']
    schema = config[f'{db}.{stage}']['schema']
    charset = config[f'{db}.{stage}']['charset']
    
    
    engine = create_engine(f'mysql+pymysql://{username}:{password}@{server}/{schema}?charset={charset}')
    conn = engine.connect()
    return conn,engine

def db_dis(conn:sqlalchemy.engine.base.Connection, engine:sqlalchemy.engine.base.Engine):
    """
    Close the connection to the database and dispose the engine.

    Parameters:
    conn (connection): The connection to the database.
    engine (SQLAlchemy engine): The engine used to connect to the database.

    Returns:
        None
    """
    conn.close()
    engine.dispose()
    
def execute_query(config:configparser.ConfigParser,db:str,stage:str,sql:str) -> None:
    """   
    Execute a SQL query but not return the result.
    Ex. USE "Database_Name";
        Delete "Table_Name";
        
    
    Args:
        config (configparser.ConfigParser): The configuration object containing the database connection details.
        db (str): The name of the database to be connected.
        stage (str): The stage environment to connect to.
        sql (str): The SQL query to be executed.
        
    Returns:
        None
    """
    conn,engine = db_con(config,db,stage)
    conn.execute(sql)
    db_dis(conn,engine)
    
# def create_keyspace(session):
#     session.execute("""
#         CREATE KEYSPACE IF NOT EXISTS spark_streams
#         WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'};
#     """)

#     print("Keyspace created successfully!")


# def create_table(session):
#     session.execute("""
#     CREATE TABLE IF NOT EXISTS stream_mysql.created_users (
#         id TEXT,
#         first_name TEXT,
#         last_name TEXT,
#         gender TEXT,
#         address TEXT,
#         post_code TEXT,
#         email TEXT,
#         username TEXT,
#         registered_date TEXT,
#         phone TEXT,
#         picture TEXT);
#     """)

#     print("Table created successfully!")


def insert_data(session, **kwargs):
    print("inserting data...")

    user_id = kwargs.get('id')
    first_name = kwargs.get('first_name')
    last_name = kwargs.get('last_name')
    gender = kwargs.get('gender')
    address = kwargs.get('address')
    postcode = kwargs.get('post_code')
    email = kwargs.get('email')
    username = kwargs.get('username')
    dob = kwargs.get('dob')
    registered_date = kwargs.get('registered_date')
    phone = kwargs.get('phone')
    picture = kwargs.get('picture')

    try:
        session.execute("""
            INSERT INTO stream_mysql.created_users(id, first_name, last_name, gender, address, 
                post_code, email, username, dob, registered_date, phone, picture)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (user_id, first_name, last_name, gender, address,
              postcode, email, username, dob, registered_date, phone, picture))
        logging.info(f"Data inserted for {first_name} {last_name}")

    except Exception as e:
        logging.error(f'could not insert data due to {e}')


def create_spark_connection():
    s_conn = None

    try:
        # s_conn = SparkSession.builder \
        #     .appName('SparkDataStreaming') \
        #     .config('spark.jars.packages', "com.datastax.spark:spark-cassandra-connector_2.13:3.4.1,"
        #                                    "org.apache.spark:spark-sql-kafka-0-10_2.13:3.4.1") \
        #     .config('spark.cassandra.connection.host', 'localhost') \
        #     .getOrCreate()
        s_conn = SparkSession.builder \
            .appName('SparkDataStreaming') \
            .config('spark.jars.packages', 'mysql:mysql-connector-java:5.1.38,'
                                            "org.apache.spark:spark-sql-kafka-0-10_2.13:3.4.1")\
            .config('spark.mysql.connection.host', 'localhost') \
            .getOrCreate()
        print("print s_conn",s_conn)
        
        s_conn.sparkContext.setLogLevel("ERROR")
        logging.info("Spark connection created successfully!")
    except Exception as e:
        logging.error(f"Couldn't create the spark session due to exception {e}")

    return s_conn


def connect_to_kafka(spark_conn):
    spark_df = None
    try:
        spark_df = spark_conn.readStream \
            .format('kafka') \
            .option('kafka.bootstrap.servers', 'localhost:9092') \
            .option('subscribe', 'users_created') \
            .option('startingOffsets', 'earliest') \
            .load()
        logging.info("kafka dataframe created successfully")
    except Exception as e:
        logging.warning(f"kafka dataframe could not be created because: {e}")

    return spark_df


# def create_cassandra_connection():
#     try:
#         # connecting to the cassandra cluster
#         cluster = Cluster(['localhost'])

#         cas_session = cluster.connect()

#         return cas_session
#     except Exception as e:
#         logging.error(f"Could not create cassandra connection due to {e}")
#         return None


def create_selection_df_from_kafka(spark_df):
    schema = StructType([
        StructField("id", StringType(), False),
        StructField("first_name", StringType(), False),
        StructField("last_name", StringType(), False),
        StructField("gender", StringType(), False),
        StructField("address", StringType(), False),
        StructField("post_code", StringType(), False),
        StructField("email", StringType(), False),
        StructField("username", StringType(), False),
        StructField("registered_date", StringType(), False),
        StructField("phone", StringType(), False),
        StructField("picture", StringType(), False)
    ])

    sel = spark_df.selectExpr("CAST(value AS STRING)") \
        .select(from_json(col('value'), schema).alias('data')).select("data.*")
    print(sel)

    return sel


# if __name__ == "__main__":
#     print("Spark start")
#     # create spark connection
#     spark_conn = create_spark_connection()
#     print("Print spark_conn :",spark_conn)
#     if spark_conn is not None:
#         # connect to kafka with spark connection
#         spark_df = connect_to_kafka(spark_conn)
#         selection_df = create_selection_df_from_kafka(spark_df)
#         # session = create_cassandra_connection()
        
#         db = config['general']['db']
#         stage = config['general']['stage']

#         print(selection_df)
#         if selection_df is not None:
#             # create_keyspace(session)
#             # create_table(session)
#             execute_query(config,db,stage,"""CREATE TABLE IF NOT EXISTS stream_mysql.created_users (
#                 id TEXT,
#                 first_name TEXT,
#                 last_name TEXT,
#                 gender TEXT,
#                 address TEXT,
#                 post_code TEXT,
#                 email TEXT,
#                 username TEXT,
#                 registered_date TEXT,
#                 phone TEXT,
#                 picture TEXT);""")
            

#             logging.info("Streaming is being started...")

#             streaming_query = (selection_df.writeStream.format("jdbc")
#                                .option("driver","com.mysql.jdbc.Driver")
#                                .option("url", "jdbc:mysql://mysql:3306/stream_mysql")
#                                 .option("dbtable", "created_users")
#                                 .option("user", "root")
#                                 .option("password", "password")
#                                .start())

#             streaming_query.awaitTermination()
            
if __name__ == "__main__":
    print("Spark start")
    spark_conn = create_spark_connection()
    print("Print spark_conn:", spark_conn)
    
    if spark_conn is not None:
        spark_df = connect_to_kafka(spark_conn)
        print("Print spark_df:", spark_df)
        selection_df = create_selection_df_from_kafka(spark_df)

        db = config['general']['db']
        stage = config['general']['stage']

        if selection_df is not None:
            execute_query(config, db, stage, """CREATE TABLE IF NOT EXISTS stream_mysql.created_users (
                id TEXT,
                first_name TEXT,
                last_name TEXT,
                gender TEXT,
                address TEXT,
                post_code TEXT,
                email TEXT,
                username TEXT,
                registered_date TEXT,
                phone TEXT,
                picture TEXT);""")

            logging.info("Streaming is being started...")

            streaming_query = (selection_df.writeStream.format("jdbc")
                               .option("driver", "com.mysql.jdbc.Driver")
                               .option("url", "jdbc:mysql://mysql:3306/stream_mysql")
                               .option("dbtable", "created_users")
                               .option("user", "root")
                               .option("password", "password")
                               .start())

            streaming_query.awaitTermination()
```

```python
import pymysql.cursors
from sqlalchemy import create_engine

class Config:
  MYSQL_HOST = setup.get("Database_Config","HOST")
  MYSQL_PORT = setup.getint("Database_Config","PORT")
  MYSQL_USER = setup.get("Database_Config","USER")
  MYSQL_PASSWORD = setup.get("Database_Config","PASSWORD")
  MYSQL_DBname = setup.get("Database_Config","DATABASE_NAME")
  MYSQL_CHARSET = setup.get("Database_Config","CHARSET")

def to_awspy(df,table,type):
    conn_string = f'mysql+pymysql://{Config.MYSQL_USER}:{Config.MYSQL_PASSWORD}@{Config.MYSQL_HOST}/{Config.MYSQL_DBname}?charset={charset}'
  
    db = create_engine(conn_string)
    conn = db.connect()

    df.to_sql(table, con=conn, if_exists=type,index=False) #{'fail', 'replace', 'append'}
    print(f'{type} "{table}" : Done ')

    conn.close()
    db.dispose()

def Set_table():
    connection = pymysql.connect(   
        host=Config.MYSQL_HOST,
        port=Config.MYSQL_PORT,
        user=Config.MYSQL_USER,
        password=Config.MYSQL_PASSWORD,
        db=Config.MYSQL_DBname,
        charset=Config.MYSQL_CHARSET,
        cursorclass=pymysql.cursors.DictCursor)

    cursor = connection.cursor()
    sql = "CREATE TABLE IF NOT EXISTS T_AC_BINANCE_EXCHAN_INFO (    \
                `symbol` VARCHAR(200)                       \
                ,`status` VARCHAR(200)                      \
                ,`baseAsset` VARCHAR(200)                   \
                ,`baseAssetPrecision` INT                   \
                ,`quoteAsset` VARCHAR(200)                  \
                ,`quotePrecision` INT                       \
                ,`quoteAssetPrecision` INT                  \
                ,`orderTypes` VARCHAR(200)                  \
                ,`icebergAllowed` VARCHAR(20)               \
                ,`ocoAllowed` VARCHAR(20)                   \
                ,`quoteOrderQtyMarketAllowed` VARCHAR(20)   \
                ,`allowTrailingStop` VARCHAR(20)            \
                ,`cancelReplaceAllowed` VARCHAR(20)         \
                ,`isSpotTradingAllowed` VARCHAR(20)         \
                ,`isMarginTradingAllowed` VARCHAR(20)       \
                ,`filters` VARCHAR(200)                     \
                ,`permissions` VARCHAR(200));" 
    cursor.execute(sql)

    sql = "CREATE TABLE IF NOT EXISTS T_AC_BINANCE_DAILY_CANDLE (   \
                `Symbol` VARCHAR(200)                       \
                ,`Open_time` TIMESTAMP(6)                   \
                ,`Close_time` TIMESTAMP(6)                  \
                ,`Open` FLOAT(20,8)                         \
                ,`High` FLOAT(20,8)                         \
                ,`Low` FLOAT(20,8)                          \
                ,`Close` FLOAT(20,8)                        \
                ,`Volume` FLOAT(20,8)                       \
                ,`Quote_asset_volume` FLOAT(20,8)           \
                ,`Number_of_trades` INT(50)                 \
                ,`Taker_buy_base_asset_volume` FLOAT(20,8)  \
                ,`Taker_buy_quote_asset_volume` FLOAT(20,8) \
                ,`Ignore` FLOAT(20,8));" 
    cursor.execute(sql)
    cursor.close()

def Daily_Candle_Load():
    connection = pymysql.connect(host=Config.MYSQL_HOST,
                             port=Config.MYSQL_PORT,
                             user=Config.MYSQL_USER,
                             password=Config.MYSQL_PASSWORD,
                             db=Config.MYSQL_DBname,
                             charset=Config.MYSQL_CHARSET,
                             cursorclass=pymysql.cursors.DictCursor)

    cursor = connection.cursor()

    sql = "SELECT * FROM `T_AC_BINANCE_EXCHAN_INFO` WHERE `status` = 'TRADING'"
    cursor.execute(sql)
    allrow=cursor.fetchall()
    X=pd.DataFrame(allrow)

    test_interval = ('1d')
    start_str = datetime.now().strftime("%d/%m/%Y") #'07/01/2022'
    end_str = datetime.now().strftime("%d/%m/%Y") #'07/01/2022'

    df = pd.DataFrame(columns =['Open_time', 'Open', 'High', 'Low', 'Close', 'Volume', 'Close_time', 'Quote_asset_volume', 'Number_of_trades', 'Taker_buy_base_asset_volume', 'Taker_buy_quote_asset_volume','Ignore','Symbol'])

    n=0

    for s in X['symbol']:
        if n>5:
            break
        Candlestick_Data = get_historical_klines(s, test_interval, start_str, end_str)
        
        df2 = pd.DataFrame(Candlestick_Data,columns =['Open_time', 'Open', 'High', 'Low', 'Close', 'Volume', 'Close_time', 'Quote_asset_volume', 'Number_of_trades', 'Taker_buy_base_asset_volume', 'Taker_buy_quote_asset_volume','Ignore'])
        
        for p in df2 ['Open_time']:
            df2['Symbol'] = s
            
        df = pd.concat([df, df2],ignore_index = True)
        
        T = len(X['symbol'])
        percentLoad = round(n/T*100,2)
        print('\r','Loading :',n,'/',T,'    >>     ',percentLoad,'%   ')
        n=n+1

    for i in range(len(df['Open_time'])):
            df['Open_time'][i] = df['Open_time'].values[i]/1000
            df['Open_time'][i] = pd.Timestamp(df['Open_time'][i], unit='s')
            df['Close_time'][i] = df['Close_time'].values[i]/1000
            df['Close_time'][i] = pd.Timestamp(df['Close_time'][i], unit='s')

    cursor.close()
    to_awspy(df,'T_AC_BINANCE_DAILY_CANDLE','append')#{'fail', 'replace', 'append'}
    line('Daily_Candle_Load',df,'Append')
```

```python
from sqlalchemy import create_engine

config = configparser.ConfigParser(allow_no_value=True)
config.read('config.ini')

#---------------------------------------Function for DataBase------------------------------------------------#
def db_con(config,db,stage):
    server = config[f'{db}.{stage}']['server']
    username = config[f'{db}.{stage}']['username']
    password = config[f'{db}.{stage}']['password']
    schema = config[f'{db}.{stage}']['schema']
    charset = config[f'{db}.{stage}']['charset']
    
    engine = create_engine(f'mysql+pymysql://{username}:{password}@{server}/{schema}?charset={charset}')
    
    conn = engine.connect()
    return conn,engine

def db_dis(conn,engine):
    conn.close()
    engine.dispose()

def db_Select(table,schema,config,source_db,source_stage):
    conn,engine = db_con(config,source_db,source_stage)
    try:
        sql = f'Select * from `{schema}`.`{table}`'
        df = pd.read_sql(sql, con=conn, chunksize=None)
    finally:
        db_dis(conn,engine)
    return df

def db_execute(config,source_db,source_stage,sql):
    conn,engine = db_con(config,source_db,source_stage)
    try:
        conn.execute(sql)
    finally:
        db_dis(conn,engine)

def convert_nan_to_null(df,col):
    col_check=None
    if df.dtypes=='datetime64[ns]':
        if pd.isnull(col):
            col=f'Null'
            col_check='"None"'
        else:
            col=f'"{col.date()}"'
            col_check=col
    elif df.dtypes=='float':
        if pd.isnull(col):
            col=f'Null'
            col_check='nan'
        else:
            col_check=col
    else:
        if pd.isnull(col):
            col=f'Null'
            col_check='"None"'
        else:
            col=f'"{col}"'
            col_check=col
    return col,col_check

def update_table(old_tabel,new_table,schema,table,source_db,source_stage):
    old_lists=[]
    old_same_lists=[]
    count_update=0
    count_insert=0
    count_old = len(old_tabel)
    count_new = len(new_table)
    for rows_old in range(len(old_tabel)):
        
        val_old_col_1=old_tabel.iloc[rows_old][f'{config["OOL_table"]["re_col_01"]}']
        val_old_col_2=old_tabel.iloc[rows_old][f'{config["OOL_table"]["re_col_02"]}']
        val_old_col_3=old_tabel.iloc[rows_old][f'{config["OOL_table"]["re_col_03"]}']
        val_old_col_4=old_tabel.iloc[rows_old][f'{config["OOL_table"]["re_col_04"]}']
        # val_old_col_5=old_tabel.iloc[rows_old][f'{config["OOL_table"]["re_col_05"]}']
        
        old_lists.append(f'{val_old_col_2}_{val_old_col_3}')
        old_same_lists.append(f'{val_old_col_1}_{val_old_col_2}_{val_old_col_3}_{val_old_col_4}')
        
    for rows_new in range(len(new_table)):
        
        value_col_1=new_table.iloc[rows_new][f'{config["OOL_table"]["re_col_01"]}']
        value_col_2=new_table.iloc[rows_new][f'{config["OOL_table"]["re_col_02"]}']
        value_col_3=new_table.iloc[rows_new][f'{config["OOL_table"]["re_col_03"]}']
        value_col_4=new_table.iloc[rows_new][f'{config["OOL_table"]["re_col_04"]}']
        value_col_5=new_table.iloc[rows_new][f'{config["OOL_table"]["re_col_05"]}']
        
        new_list=f'{value_col_2}_{value_col_3}'
        # Transaction_Date,Transaction_check=convert_nan_to_null(test2["Transaction Date"],test2.iloc[rows_new]["Transaction Date"])
        # DPD_day,DPD_check=convert_nan_to_null(test2["DPD"],test2.iloc[rows_new]["DPD"])
        # Bucket,Bucket_check=convert_nan_to_null(test2["Bucket"],test2.iloc[rows_new]["Bucket"])
        same_list=f'{value_col_1}_{new_list}_{value_col_4}'

        if new_list in old_lists:
            if same_list not in old_same_lists:
                sql = f'UPDATE `{schema}`.`{table}`'\
                    f'SET `{config["OOL_table"]["re_col_01"]}`      = "{value_col_1}",'\
                        f'`{config["OOL_table"]["re_col_04"]}`      = "{value_col_4}",'\
                        f'`{config["OOL_table"]["re_col_05"]}`      = "{value_col_5}"'\
                    f'WHERE `{config["OOL_table"]["re_col_02"]}`    = "{value_col_2}" and'\
                        f'`{config["OOL_table"]["re_col_03"]}`      = "{value_col_3}"'
                db_execute(config,source_db,source_stage,sql)
                count_update += 1
        else:
            sql = f'INSERT INTO `{schema}`.`{table}`('\
                    f'`{config["OOL_table"]["re_col_01"]}`,'\
                    f'`{config["OOL_table"]["re_col_02"]}`,'\
                    f'`{config["OOL_table"]["re_col_03"]}`,'\
                    f'`{config["OOL_table"]["re_col_04"]}`,'\
                    f'`{config["OOL_table"]["re_col_05"]}`)'\
                    'VALUES ('\
                    f'"{value_col_1}",'\
                    f'"{value_col_2}",'\
                    f'"{value_col_3}",'\
                    f'"{value_col_4}",'\
                    f'"{value_col_5}")'
            db_execute(config,source_db,source_stage,sql)
            count_insert += 1
    return count_old,count_new,count_update,count_insert

def create_table(schema,table,source_db,source_stage):
    sql = f'CREATE TABLE IF NOT EXISTS `{schema}`.`{table}`('       \
                    f'`{config["OOL_table"]["re_col_01"]}` {config["OOL_table"]["typ_re_col_01"]},'\
                    f'`{config["OOL_table"]["re_col_02"]}` {config["OOL_table"]["typ_re_col_02"]},'\
                    f'`{config["OOL_table"]["re_col_03"]}` {config["OOL_table"]["typ_re_col_03"]},'\
                    f'`{config["OOL_table"]["re_col_04"]}` {config["OOL_table"]["typ_re_col_04"]},'\
                    f'`{config["OOL_table"]["re_col_05"]}` {config["OOL_table"]["typ_re_col_05"]})'
    db_execute(config,source_db,source_stage,sql)
```

```python
# import adapter.db_adapter
from adapter.db_adapter import db_adapter
from plugin.mysql_plugin import mysql_plugin
from adapter.source_adapter import source_adapter
from plugin.gspread_plugin import gspread_plugin

import configparser
from datetime import datetime
import logging
from logging.handlers import TimedRotatingFileHandler

FORMATTER = logging.Formatter("%(asctime)s — %(name)s — %(levelname)s — %(message)s")
LOG_FILE = "log/ool_Log"
logger = logging.getLogger()
logger.setLevel(logging.DEBUG)
# Add makdir for log folder
file_handler = TimedRotatingFileHandler(LOG_FILE, when='midnight')
file_handler.setFormatter(FORMATTER)
logger.addHandler(file_handler)
logger.propagate = False

config = configparser.ConfigParser(allow_no_value=True)
config.read('config.ini')

class logic:
    def __init__(self,source : source_adapter, db: db_adapter,config):
        self.source = source
        self.db = db
        self.config = config
        self.source_db = config["general"]["database"]
        self.schema = config["general"]["schema"]
        self.table = config["general"]["table"]
        self.url = config["general"]["url"]
        self.permision = config["general"]["permision"]
        self.credentials_path = config["general"]["credentials_path"]

        
    def read_col_name(df):
        cols = []
        for col in df.columns:
            cols.append(col)
        return cols
    
    def main(self):
        try:
            #read google sheet to dataframe "new_table"
            new_table = self.source.read_gspread(self.url,self.permision,self.credentials_path)
            logger.info(f'Success at ..read_google... : {self.url}')
        except Exception as e:
            logger.error(f"Fail at ...read_google... : {self.url} : due to {str(e)}")
        
        try:
            #rename : change space to "_" in columns name
            cols = logic.read_col_name(new_table)
            new_table=new_table.rename(columns={cols[0]:config["ool_table"]["re_col_01"],cols[2]:config["ool_table"]["re_col_03"]})

            #add column "timestamp"
            now=datetime.today()
            new_table[config["ool_table"]["re_col_05"]]=now.strftime('%Y%m%d%H%M%S')

            #remove column 'Customer name','Status 1','Status 2','Status 3','Comment'
            cols = logic.read_col_name(new_table)
            remove_list=['Customer name','Status 1','Status 2','Status 3','Comment']
            for col_list in remove_list:
                cols.remove(col_list)
            new_table = new_table[cols]
            
            logger.info(f'Success at ..prepare_df... ')
        except Exception as e:
            logger.error(f"Fail at ...prepare_df... : due to {str(e)}")
            
        try:
            #create table "OPT_OUT_LIST" is not exists
            self.db.create_table(self.schema,self.table,self.config,self.source_db)
            
            logger.info(f'Success at ..create_table... : {self.schema}.{self.table} ')
        except Exception as e:
            logger.error(f"Fail at ...create_table... : {self.schema}.{self.table} : due to {str(e)}")
            
        try:
            #select table "OPT_OUT_LIST" for old_list
            old_table = self.db.db_select(self.schema,self.table,self.config,self.source_db)
            
            logger.info(f'Success at ..select_table... : {self.schema}.{self.table} ')
        except Exception as e:
            logger.error(f"Fail at ...select_table... : {self.schema}.{self.table} : due to {str(e)}")
        
        try:
            #update table "OPT_OUT_LIST"
            count_update,count_insert = logic.upserting_table(self,old_table,new_table)
            
            logger.info(f'Success at ..upserting_table... : {self.schema}.{self.table} ')
            logger.info(f'OPT_OUT_LIST(MySQL) : {len(old_table)} Rows')
            logger.info(f'OPT_OUT_LIST(Google Sheet) : {len(new_table)} Rows')
            logger.info(f'Update_rows : {count_update}  >> Insert_rows : {count_insert}')
        except Exception as e:
            logger.error(f"Fail at ...upserting_table... : {self.schema}.{self.table} : due to {str(e)}")
            
        logger.info(f'<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Done>>>>>>>>>>>>>>>>>>>>>>>>>>>')

    def upserting_table(self,old_table,new_table):
        old_lists=[]
        old_same_lists=[]
        count_update=0
        count_insert=0
        
        for rows_old in range(len(old_table)):

            value = []
            for col_name in old_table.columns:
                value.append(old_table.iloc[rows_old][col_name])
            
            old_lists.append(f'{value[1]}_{value[2]}')
            old_same_lists.append(f'{value[0]}_{value[1]}_{value[2]}_{value[3]}')
            
        for rows_new in range(len(new_table)):
            
            insert_col= []
            value= []
            update= []
            for col_name in new_table.columns:
                value.append(new_table.iloc[rows_new][col_name])
                insert_col.append(col_name)
                update.append(f'`{col_name}` = "{new_table.iloc[rows_new][col_name]}"')

            # "new_list" for check only key-column in "old_lists"
            # "same_list" for check detail column in "old_same_lists"
            new_list=f'{value[1]}_{value[2]}'
            same_list=f'{value[0]}_{new_list}_{value[3]}'
            
            if new_list in old_lists: #If have key-column exists in old_table 
                if same_list not in old_same_lists: #If not have detail column exists in old_table 
                    # "set" and "where" for update statement
                    set = f'{update[0]},{update[3]},{update[4]}'
                    where = f'{update[1]} and {update[2]}'
                    
                    self.db.update_table(self.schema,self.table,self.config,self.source_db,set,where)
                    count_update += 1
                    
            else:
                # "columns" and "value" for insert statement
                insert_columns = '(`'+'`,`'.join(insert_col)+'`)'
                insert_value = '("'+'","'.join(value)+'")'

                self.db.insert_table(self.schema,self.table,self.config,self.source_db,insert_columns,insert_value)
                count_insert += 1
                
        return count_update,count_insert

if __name__ == '__main__':
    app = logic(source=gspread_plugin(),
                db=mysql_plugin(),
                config=config
                )
    app.main()
```

```python
from adapter.db_adapter import db_adapter

from sqlalchemy import create_engine
import pandas as pd

class mysql_plugin(db_adapter):

    def db_con(config,db):
        server = config[f'{db}']['server']
        username = config[f'{db}']['username']
        password = config[f'{db}']['password']
        schema = config[f'{db}']['schema']
        charset = config[f'{db}']['charset']

        engine = create_engine(f'mysql+pymysql://{username}:{password}@{server}/{schema}?charset={charset}')

        conn = engine.connect()
        return conn,engine

    def db_dis(conn,engine):
        conn.close()
        engine.dispose()
        
    def db_select(self,schema,table,config,source_db):
        conn,engine = mysql_plugin.db_con(config,source_db)
        try:
            sql = f'Select * from `{schema}`.`{table}`'
            df = pd.read_sql(sql, con=conn, chunksize=None)
        finally:
            mysql_plugin.db_dis(conn,engine)
        return df
    def db_execute(config,source_db,sql):
        conn,engine = mysql_plugin.db_con(config,source_db)
        try:
            conn.execute(sql)
        finally:
            mysql_plugin.db_dis(conn,engine)
        
    def create_table(self,schema,table,config,source_db):
        sql = f'CREATE TABLE IF NOT EXISTS `{schema}`.`{table}`('       \
                    f'`{config["ool_table"]["re_col_01"]}` {config["ool_table"]["typ_re_col_01"]},'\
                    f'`{config["ool_table"]["re_col_02"]}` {config["ool_table"]["typ_re_col_02"]},'\
                    f'`{config["ool_table"]["re_col_03"]}` {config["ool_table"]["typ_re_col_03"]},'\
                    f'`{config["ool_table"]["re_col_04"]}` {config["ool_table"]["typ_re_col_04"]},'\
                    f'`{config["ool_table"]["re_col_05"]}` {config["ool_table"]["typ_re_col_05"]})'
        mysql_plugin.db_execute(config,source_db,sql)
    
    def update_table(self,schema,table,config,source_db,set,where):
        sql = f'UPDATE `{schema}`.`{table}` '\
                f'SET {set} WHERE {where}'
        mysql_plugin.db_execute(config,source_db,sql)
        
    def insert_table(self,schema,table,config,source_db,insert_columns,insert_value):
        sql = f'INSERT INTO `{schema}`.`{table}`{insert_columns}'\
                f'VALUES {insert_value}'
        mysql_plugin.db_execute(config,source_db,sql)

    def convert_nan_to_null(df,col):
        col_check=None
        if df.dtypes=='datetime64[ns]':
            if pd.isnull(col):
                col=f'Null'
                col_check='"None"'
            else:
                col=f'"{col.date()}"'
                col_check=col
        elif df.dtypes=='float':
            if pd.isnull(col):
                col=f'Null'
                col_check='nan'
            else:
                col_check=col
        else:
            if pd.isnull(col):
                col=f'Null'
                col_check='"None"'
            else:
                col=f'"{col}"'
                col_check=col
        return col,col_check
```

```sh
~~~bash
aws rds create-db-instance \
    --db-instance-identifier test-mysql-instance \
    --db-instance-class db.t3.micro \
    --engine mysql \
    --master-username test \
    --master-user-password test \
    --allocated-storage 20
~~~

aws --endpoint-url=http://localhost:4564 rds create-db-instance --db-instance-identifier testmysqlinstance --db-instance-class db.t3.micro --engine mysql --master-username test --master-user-password test --allocated-storage 20

aws --endpoint-url=http://localhost:4565 rds-data execute-statement --database mydb --resource-arn arn:aws:rds:us-east-1:000000000000:cluster:db1 --secret-arn arn:aws:secretsmanager:us-east-1:000000000000:secret:dbpass-cfnAX --include-result-metadata --sql 'SELECT 123'
```
