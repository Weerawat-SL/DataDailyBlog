---
layout: post
title:  "DP-203: Data Engineering on Microsoft Azure/เตรียมสอบ"
author: "Weerawat"
tags: Certificate_Exam #[tag1, tag2, tag3]
# opengraph: {{ site.baseurl }}/assets/image/DE.jpg
# name: Jane Doe
# position: Developer
---
![alt text](/assets/AzureCerFlowDP203.png)

---
[Course DP-203T00--A: Data Engineering on Microsoft Azure](https://learn.microsoft.com/en-us/training/courses/dp-203t00)
[CHALLENGE COLLECTION: Azure Synapse Analytics](https://learn.microsoft.com/en-us/collections/gm3rbm8g0r7e?WT.mc_id=cloudskillschallenge_3d6cb3b9-f4b7-4d7b-ab23-57faa1762705)
**Table of Contents**
- [**Microsoft Official Exam Prep**](#microsoft-official-exam-prep)
  - [Introduction](#introduction)
  - [Objectives Domain Review](#objectives-domain-review)
  - [Design and implement data storage (15–20%)](#design-and-implement-data-storage-1520)
  - [Develop data processing (40–45%)](#develop-data-processing-4045)
  - [Secure, monitor, and optimize data storage and data processing (30–35%)](#secure-monitor-and-optimize-data-storage-and-data-processing-3035)
- [Microsoft Learning Path](#microsoft-learning-path)
  - [Get started with data engineering on Azure](#get-started-with-data-engineering-on-azure)
    - [Introduction to data engineering on Azure](#introduction-to-data-engineering-on-azure)
    - [Introduction to Azure Data Lake Storage Gen2](#introduction-to-azure-data-lake-storage-gen2)
      - [Understand Azure Data Lake Storage Gen2](#understand-azure-data-lake-storage-gen2)
        - [Benefits](#benefits)
        - [Hadoop compatible access](#hadoop-compatible-access)
        - [Security](#security)
        - [Performance](#performance)
        - [Data redundancy (ซ้ำซ้อนของข้อมูล)](#data-redundancy-ซ้ำซ้อนของข้อมูล)
      - [Enable Azure Data Lake Storage Gen2 in Azure Storage](#enable-azure-data-lake-storage-gen2-in-azure-storage)
      - [Compare Azure Data Lake Store to Azure Blob storage](#compare-azure-data-lake-store-to-azure-blob-storage)
      - [Understand the stages for processing big data](#understand-the-stages-for-processing-big-data)
      - [Use Azure Data Lake Storage Gen2 in data analytics workloads](#use-azure-data-lake-storage-gen2-in-data-analytics-workloads)
        - [Big data processing and analytics](#big-data-processing-and-analytics)
        - [Data warehousing](#data-warehousing)
        - [Real-time data analytics](#real-time-data-analytics)
        - [Data science and machine learning](#data-science-and-machine-learning)
    - [Azure Synapse Analytics (CHALLENGE COLLECTION)](#azure-synapse-analytics-challenge-collection)
      - [Introduction to Azure Synapse Analytics](#introduction-to-azure-synapse-analytics)
        - [Introduction](#introduction-1)
        - [What is Azure Synapse Analytics](#what-is-azure-synapse-analytics)
        - [How Azure Synapse Analytics works](#how-azure-synapse-analytics-works)
        - [When to use Azure Synapse Analytics](#when-to-use-azure-synapse-analytics)
        - [Exercise - Explore Azure Synapse Analytics](#exercise---explore-azure-synapse-analytics)
      - [Survey the Components of Azure Synapse Analytics](#survey-the-components-of-azure-synapse-analytics)
        - [Introduction](#introduction-2)
        - [Create Azure Synapse Analytics workspace](#create-azure-synapse-analytics-workspace)
        - [Exercise - Create and manage Azure Synapse Analytics workspace](#exercise---create-and-manage-azure-synapse-analytics-workspace)
        - [Describe Azure Synapse Analytics SQL](#describe-azure-synapse-analytics-sql)
        - [Explain Apache Spark in Azure Synapse Analytics](#explain-apache-spark-in-azure-synapse-analytics)
        - [Exercise - Create pools in Azure Synapse Analytics](#exercise---create-pools-in-azure-synapse-analytics)
        - [Orchestrate data integration with Azure Synapse pipelines](#orchestrate-data-integration-with-azure-synapse-pipelines)
        - [Exercise-Identifying Azure Synapse pipeline components](#exercise-identifying-azure-synapse-pipeline-components)
        - [Visualize your analytics with Power BI](#visualize-your-analytics-with-power-bi)

---

>_**คำเตือน** เนื้อหาต่อจากนี้เป็นเนื้อหาหัวข้อการสอบ**เท่านั้น** ซึ่งครอบคลุมแค่ไม่ได้ลงลึก ดังนั้น ต้องไปอ่านเพิ่ม และทำ Labs เองจากหัวข้อเหล่านี้_

# **Microsoft Official Exam Prep**

![](/assets/DP203/00-cover.png)

## Introduction
![](/assets/DP203/01-Certification_journey.png)
คอสที่แนะนำเบื่องต้นเพื่อเพิ่มความเข้าใจและประสบการณ์
- Microsoft Azure Fundamentals AZ-900 : 
  - Describe cloud concepts
  - Describe Azure architecture and services
  - Describe Azure management and governance
- Microsoft Azure Administrator AZ-104: 
  - Implement and manage virtual networking
    - Configure and manage virtual networks in Azure
  
ซึ่งจะทำให้คุณเข้าใจภาพรวมของ
- enterprise networking on premises or cloud infrastructure
- network security
- understand on premises virtualization technologies
  - VMs 
  - virtual networking 
  - virtual hard disks 
- network configurations 
  - TCP IP 
  - domain name systems 
  - virtual private networks 
  - firewalls 
  - encryption technologies 
- software defined networking 
- hybrid network connectivity methods 
- resilience 
- disaster recovery including
  -  high availability 
  -  restore operations 


ทั้งนี้เนื้อหาในส่วนนี้จะเป็นการไกด์ที่ครอบคลุมเนื้อหาที่สอบแต่ไม่ได้เจาะลึก ดังนั้นหลีกเลี่ยงไม่ได้ที่จะต้องไปศึกษาเพิ่มเติมและทดลองใช้งานผ่าน Lab ที่เตรียมไว้ให้

![](/assets/DP203/02-Objectives.png)
เนื้อหาส่วนนี้มีวัตถุประสงค์เพื่อ
1. ระบุสิ่งที่จะครอบคลุมในการสอบ
2. กำหนดแนวคิดที่จะจัดลำดับความสำคัญสำหรับการศึกษาต่อ
3. อธิบายรูปแบบคำถามสอบที่เป็นไปได้ที่แตกต่างกัน
4. ค้นหา ทรัพยากรการเรียนรู้ที่พร้อมใช้งาน

ดังนั้นจำไว้ว่า เนื้อหาส่วนนี้ไม่ได้อ่านแล้วจะทำข้อสอบได้เลย
## Objectives Domain Review

![](/assets/DP203/04-Objectives_domain_breakdown.png)
DP-203 objective domain แบ่งเป็น 3 หัวข้อหลักๆ ดังนี้
- design and implement data storage 
- develop data processing secure monitoring
- optimized data storage and data processing 

ซึ่งจะมีน้ำหนักการออกข้อสอบ แต่ต่างกันไป เป็นไกด์ให้ว่าควรเน้นเนื้อหาส่วนไหนมากน้อยกว่ากัน

## Design and implement data storage (15–20%)
![](/assets/DP203/05-Skills_Measured1.png)
first functional group or skills measured our first functional group is about 
- how to design and implement data storage 
  - how to implement a partition strategy and design 
  - how to implement the data exploration layer 

![](/assets/DP203/06-Implement_a_partition_Strategy_for_files.png)

let's begin with the first topic in this functional group every workload has different requirements on how the data is consumed but these are some common layouts to consider when working with Internet of Things or IOT batch scenarios or when optimizing for time series data in io T workloads there could be a great deal of data ingested that spans across numerous products devices organizations and customers it's important to pre plan the directory layout for organization security and efficient processing of the data for downstream consumers a general template you may consider might be one that uses region as one level of directory within that you might have subject matters as subdirectories then you may have sub directories for each year and a four digit year format then within each of those a 2 digit month format for each month and then a two digit day format for each day and possibly even a 2 digit hour format and then you would place the data coming in into the appropriate directory for batch processing job structures there are a lot of similarities a commonly used approach in batch processing is to place data into an in directory so in such a case you would keep your region and subject matters but then you may have an in directory and then from there you may have the four digit year 2 digit month 2 digit day and two digit hour subdirectories for your out data you may also go regions subject matters and then out and then the formats in the same formats that you've used before and you will always need to deal with some corrupt or bad data so in a case like this we may also go region and subject matters but then have a third subdirectory for bad and then the date format after that for time series data partition pruning can help some queries read only a subset of the data which can improve performance so a common example we see for data that is structured by date may be a data set by name add data 4 digit year 2 digit month to digit day and then your files within that particular subdirectory consider using data flows and Azure data factory or using synapse pipelines to partition data when writing files to Azure data lake storage Gen. 2 or to Azure BLOB storage 

![](/assets/DP203/07-Implement_a_partition_Strategy_for_streaming_workload.png)
next let's examine how to implement a partition strategy for analytical workloads event hubs use partitions that help to segment data and allow you to read each partition in parallel event hubs stream data at a massive scale partitioning is built into event hubs to enable horizontal scaling you can only read a specific partition of the message stream at a time the event publishers are only aware of the partition key not the actual partition to which the events are being published the decoupling of key and partition prevents the sender from knowing the downstream processing 

![](/assets/DP203/08-Implement_a_partition_Strategy_for_Synapse.png)
next let's examine how to implement a partition strategy for Azure synapse analytics table partitioning allows you to split data into smaller subsets based on a partition column this can help you manage data more easily and improve query performance by reducing the amount of data scanned however the benefits of partitioning depend on how you load data and whether you use the same column for partitioning and filtering remember that you can only partition the table by one column in SQL Server and the partition column must have multiple values upon which to partition partitioning is supported on all table types arrange partitioning creates one or more table partitions these partitions are horizontal table slices that let you apply operations to subsets of rows regardless of whether the table is stored as a heap clustered index or clustered columnstore index the primary benefits to partitioning are that it improves efficiency performance of of loading and querying by limiting the scope to a subset of data it may offer query performance enhancements where filtering on the partition key can eliminate unnecessary scans and eliminate input and output operations and with multiple column distribution or MCD which is only available on dedicated SQL pools you can choose up to 8 columns for distribution MCD is highly desirable for easing migrations and it promotes faster query performance and reduces data skew while partitioning can be used to improve performance creating a table with too many partitions can hurt performance so for partitioning to be helpful it's important to understand when to use partitioning and the number of partitions to create a successful partitioning scheme usually has 10s to hundreds of partitions and not thousands 

![](/assets/DP203/09-Identify_when_partitioning_is_needed_in_Data_Leke_Storage_Gen2.png)
next let's examine how to identify when partitioning is needed in Azure data lake storage Gen. 2 partitioning can improve scalability reduce contention and optimize performance the partitioning strategy must be chosen carefully to maximize the benefits while minimizing adverse effects consider scale targets for BLOB storage and storage accounts partitioning as your BLOB storage will mean that the partition key that you choose is going to be your account name plus your container name plus the BLOB name the partition key is used to partition data into ranges and these ranges are load balanced across the system blobs are distributed across many servers to scale out access to them a single BLOB can only be served by a single server the naming convention that uses timestamps or numerical identifiers can lead to a hot partition which limits the system from effectively balancing your load so for example if you have daily operations that use a BLOB object with a timestamp such as the four digit year dash 2 digit month dash 2 digit day all the traffic for that operation goes to a single partition server so consider prefixing the name with a three digit hash writing a single block or page is an atomic action which means it either succeeds or fails as a whole however writing across multiple blocks pages or blobs is not atomic which means it can result in partial or inconsistent data to ensure data consistency when performing write operations is spanned blocks pages or blobs you need to acquire a BLOB lease that locks the BLOB and prevents other writers from modifying it 

![](/assets/DP203/10-Create_and_execute_queries_by_using_a_compute_solution.png)
next let's examine how to create and execute queries by using a compute solution as your synapse serverless SQL pool is tailored for querying the data in the data link it supports querying formats such as CSV JSON and parquet file formats directly CSV files are a common file format within many businesses and you can query a single CSV file using serverless SQL pool so when we query these various formats some of the formats we can specify include with or without a header row, or tab delimited values windows or Unix style index non quoted and quoted values and escaping characters the open roset function works on the serverless SQL pool but not the dedicated SQL pool and enables you to read the content of RK file by providing the URL to your file the query should use open row set to reach Jason files of two formats either standard JSON files that contain a JSON array of multiple JSON documents or align delimited JSON file that separates each JSON document with a new line character these files usually have extensions like JSON L or Lt. JSON or NDJ son you can also query multiple files and folders using Azure synapse serverless SQL pools the SQL serverless supports reading multiple files or folders by using wildcards similar to wild cards that are used in the Windows operating system 

![](/assets/DP203/11-Implement_Synapse_Analytics_Database_Templates.png)
next let's examine how to implement Azure synapse analytics database templates you can implement Azure snaps analytics database templates to create a linked database to align data to a new model and use the integrated experience to analyze the data the steps to implement an Azure synapse analytics database template are to create the lake database from database templates using a new database templates functionality and then number one we will configure a lake database by making sure that the storage account and the file path are set to a location where you wish to destroy the data #2 and just data to lake database by executing pipelines with code free data flow mapping that have workspace DB connector to load data directly to the database table #3 query the data by opening a new spark notebook and using the integrated experience note that SQL databases in serverless SQL pools are supported and automatically understand the newly created late database format and #4 you can train machine learning models using the like database 

![](/assets/DP203/12-Recommend_Synapse_Analytics_Database_Templates.png)
next let's examine how to recommend as your synapse analytics database templates a typical database template addresses the core requirements of a specific industry and consists of one or more enterprise templates and tables grouped by business areas you can leverage the library of Azure synapse analytics database templates to accelerate time to insights based on the standardized business area plans for different industries to identify gaps and opportunities in the existing enterprise data model or to consolidate data silos and query from synapse studio or to create a well formed data lake ready for analytics at scale to enrich data with Azure cognitive services and Azure machine learning or to develop reports using power BI 

![](/assets/DP203/13-push_new_or_updated_data_lineage_from_Microsoft_purview.png)
next let's examine how to push new or updated data lineage from Microsoft per view the data factory user interface is used to create a pipeline that runs activities and reports lineage data to the Microsoft purview account that data lineage information can be viewed in the Microsoft purview account in order to view this in order to set this up you have performed the following steps to push new or updated data lineage to Microsoft per view number one connect data factory to the Microsoft purview account you can do that with two options you can connect data factory to Microsoft per view account in the data factory where you can register data factory in Microsoft purview number two run your pipelines in data factory you can create pipelines copy activities data flow activities in the data factory the data is captured automatically during activities execution monitor your data lineage reporting status you can use the lineage status button to access the pipeline monitoring view #4 examine data mining ship information in Microsoft purview account you can browse assets and check the lineage tab to view the copy activity the data flow activity or the execute SSIS package activities 

![](/assets/DP203/14-browse_and_search_metadata_in_the_Microsoft_purview_data_catalog.png)
next let's examine how to browse and search metadata in the Microsoft purview data catalog the Microsoft purview data catalog allows for quick finding of metadata through the browse and search features and browsing the Microsoft preview data catalog helps explore available data either by collection or through traversing the hierarchy of each source in the catalog with searching the Microsoft purview data catalog helps explore the data when you know what you're searching for and add keywords for your search in the search bar the search history and the assets recently accessed in the data catalog allow for a quick pickup from the previous data explored The search results are filtered through the purview relevance engine 

![](/assets/DP203/15-Practice_questions.png)
now test your knowledge by answering some practice questions it's important to remember that the upcoming questions are a bit different from the ones on the actual exam these questions are meant to serve as a review of the topics we discussed add to help give you an idea of the level of knowledge you need for the exam remember that the real exam is about applying the knowledge so the questions on the exam will often give your scenario and ask you what you would do for a closer experience to the actual exam I strongly encourage you to check out the official practice test 

![2](/assets/DP203/16-questions1.png)
question one which of the following allows you to repartitions containing segmented streaming data in parallel is it #1 the seed will pool #2 Yvette hubbs #3 as your BLOB storage important #4 Microsoft perfume let's review some answers in this case the answer is event hubs event hubs use partitions that help to segment data and allow you to read each partition in parallel 

![3](/assets/DP203/17-questions2.png)
question 2 while implementing Azure synapse analytics database templates what should be done after configuring the like database is it #1 queries data #2 train the machine learning models #3 ingest data to like database or #4 create a database let's review the answer the correct answer is to ingest the data into the late database so how did you do 

![](/assets/DP203/18-Recap.png)
![](/assets/DP203/19-review.png)
let's now recap what we have covered in this video so far in this functional group we have looked at implementing A partitioning strategy for files analytical workloads streaming workloads and for Azure synapse analytics we have also looked at identifying when partitioning is needed in Azure data lake storage Gen. 2 we've looked at creating and executing queries by using a computer solution that leverages SQL serverless pools and spark clusters we looked at implementing Azure synapse analytics database templates and recommending Azure synapse analytics database templates pushing new or updated data lineage to Microsoft per view and browsing and searching metadata in Microsoft purview data catalog with that we come to the end of functional Group One we hope you will join us for functional group 2 develop data process

## Develop data processing (40–45%)

welcome back my name is Steve Howard and I'm a Microsoft technical trainer this is a DP203 exam prep video series and in this second video we will review how to develop data processing 

![](/assets/DP203/20-Skills_Measured2.png)
in this group we will revisit how to ingest and transform data develop a batch processing solution develop a strain processing solution and manage batches and pipeline 

![alt text](/assets/DP203/21-Transform_data_by_using_Transact-SQL(T-SQL).png)
let's begin with the first topic in this functional group TCP runs insert update and delete operations on a target table from the results of a July with a source table so in this we can use the merge to perform such things as insert and update operations on a table in a single statement we could do updated delete operations on a single table in a single statement we could do updated insert operations on a target table by using a derived source table or an external polybase table and we could do insert or update on a target edge table and a graph database we can also insert the results of the merge statement into another table note that polybase is a feature of SQL Server and Azure synapse analytics that enables you to run transact SQL queries that redacta from external data sources it makes these external data sources appear like tables in a SQL database some of the key activities to transform data are as follows a script activity which allows the user to insert modify or a stored procedure activity which enables the user to invoke a stored procedure in Azure SQL database Azure synapse analytics or in a SQL Server database 

![alt text](/assets/DP203/22-Ingest_and_transform_data_by_using_Azure_synapse_pipelines(ADF).png)
next let's examine how to ingest and transform data by using Azure synapse pipelines or Azure data factory performed data transformations with Azure synapse pipelines code free by using the mapping data flow task once you've moved the data into Azure data lake storage Gen. 2 you're ready to build a mapping data flow to transform your data at scale via an Azure data factory or Azure synapse pipeline and then load it into data warehouse the tasks at a high level would include preparing the environment which would include turning on the data flow debug and adding a data flow activity you could also add a data source use the mapping data flow transformation and following the steps to do that writing to a data sync because our data flows will always go from a source to a sink and then after it's built you always want to test by running the pipeline customers can ingest data using Azure data factory as it empowers customers to do code free ETL or ELT including preparation and transformation as your synapse can be used exclusively and it works well for Greenfield projects but for organizations with the existing investments in Azure with Azure data factory Azure databricks and power BI you could take a hybrid approach and combine them with Azure synapse analytics you want to manage your source data files with such strategies as maintaining a well engineered data lake structure and compressing and optimizing files to minimize IOPS or input output operations and splitting your source files to maximize parallel processing 

![alt text](/assets/DP203/23-Design_and_implement_incremental_loads.png)
next let's examine how to design and implement incremental loads there are different techniques to implement incremental loads using Azure data factory you can load delta data from a source database using a watermark to do this you would define a watermark in your source database load the change data between an old watermark and a new watermark from the source table to the destination the load delta data from a SQL database using the change tracking technology enable and application to identify inserted updated or deleted data you can load new and changed files using a last modified date so with this you would copy the new and changed files to the destination store using the last modified date ADF scans all source files and applies the file filter by their last modified date and only copies the new and updated files since the last time to the destination store or you could load new files using time partition folder or file name so there you would copy the new files in which files or folders have already been timed partitioned with the time slice information as a part of the file or folder name 

![alt text](/assets/DP203/24-Transform_data_by_using_Apache_spark.png)
next let's examine how to transform data by using Apache spark you could transform data using a spark activity in the Azure data factory and synapse analytics in the same way that you would in spark jobs on spark notebooks the high level steps to do it here you would add a spark activity to the pipeline canvas 

next you would select a new spark activity on the canvas no this is done when a spark activity is not already selected you could select the HDI cluster tab or you could choose a synapse spark tool for synapse pipelines and you can select or create a new linked service to an HD insight cluster to execute the spark activity then you will select the script or the jar tab and you can create a new job a link service to an Azure storage account to host your script 

![alt text](/assets/DP203/25-Transform_data_by_using_Azure_stream_analytics.png)
next let's examine how to transform data by using Azure stream analytics the stream analytics pipeline provides a transformed data flow from input to output and streams analytics a job is a unit of execution a stream analytics job pipeline consists of three parts it will be an input that provides the source of the data stream a transformation query that acts on the input so for example a transformation query could aggregate the data or it can perform a join from 2 inputs and you will have an output that identifies the destination of the transformed data keep in mind that stream analytics as the name of applies is a streaming technology 

![alt text](/assets/DP203/26-Cleanse_data.png)
the data ingested from source locations is cleansed normalized and processed for other tests using Apache spark in Azure synapse analytics and databricks the choice of techniques depends on your specific business requirements such as replacing values splitting data pattern matching enumerations and custom transformations 

![alt text](/assets/DP203/27-handle_duplicate_data.png)
next let's examine how to handle duplicate data you can easily perform tasks such as data deduplication and null filtering by using code snippets and mapping data flows in a new pipeline and activity within the pipeline you may select the source settings tab add a source transformation and then connect it to one of your data sets the dedupe and null check snippets use generic patterns that leverage data flow schema drift and work with any schema from your data set or with data sets that have no predefined schema 

![alt text](/assets/DP203/28-handle_missing_data.png)
next let's examine how to handle missing data when reading data from a file based data source Apache spark faces two typical error cases first the files may not be readable so for instance they could be missing and accessible or corrupted second even if the files are processable some records may not be parsable for example to the syntax errors and schema mismatch so in such a case you may need to set up exception handling you can obtain the exception records and files and reasons from the exception logs by setting the data source option bad records path that records path specifies a path to store exception files for recording the information about bad records for CSV and Json source and bad files for all the file based built-in sources so for example parquet in addition when reading files transient errors like network connection exception Iowa exception and so on may occur these errors are ignored and recorded under the bad records path and spark will continue to run on the tasks 



![alt text](/assets/DP203/29-handle_late_arriving_data.png)
next let's examine how to handle late arriving data for each incoming event as your stream analytics compares the event time with the arrival time so you can use the late arrival policy and out of order policy to configure how stream analytics processes events based on their event time and arrival time you can also choose to adjust or drop events that are light or out of order based on these policies you can use a Lambda correction strategy to detect and correct the late arriving data in the stream layer and update the serving layer accordingly this way you can avoid reprocessing all of your historical data and reduce the latency and cost of your data pipeline you can use different methods of handling later arriving to mint on data lake house using Azure synapse such as deleting fact rows with unmatched dimension keys or moving them to a separate landing table or generating dummy the dimension rows. 

![alt text](/assets/DP203/30-split_data.png)
next let's examine how to split data that a flows are available both in Azure data factory and Azure synapse pipelines you can use conditional split transformations while mapping your data flows in the conditional split you will see that you will set up a stream name which will be just the name of how we are going to send the data that matches this particular condition you can set up one or multiple conditions to send data based on values in that data two different outputs 

![alt text](/assets/DP203/31-shred_JSON.png)
next let's examine how to shred JSON queries can be used to read JSON files using the openrowset function but remember open row set is available only in the serverless SQL pool in synapse and not in the dedicated SQL pool to read Jason documents you can use a couple of different methods you can provide the file URL to the open row set function or you can use the open JSON bulk which will read the contents of the file and return it in a bulb column to read classy JSON files you would set the values 0X0B for the row Terminator to parse Jason documents you will use one of two TC SQL functions you can use the JSON value to return a single scalar value with a valid JSON path where you can use the function open JSON to return a table with one or more columns and rows from a Jason string 

![alt text](/assets/DP203/32-encode_and_decode_data.png)
next let's examine how to encode and decode data expressions and functions supported by Azure data factory and Azure synapse analytics in mapping data flows include aski which returns at numeric value of an input character char which returns the ASCII character represented by the input number decode which decodes the encoded input data into a string based on a given character set and encode which encodes the input string data into binary based on a character set 

![alt text](/assets/DP203/33-configure_error_handling_for_a_transformation.png)
next let's examine how to configure error handling for a transformation we always must be able to handle error conditions that may arise within our data this could include such things as column translation what we need to do is set the sync error row handling to continue on error when processing database data in such a case we'll choose the error row handling option in the sync transformation and we'll set our output error rows this will automatically generate a CSV file output of your row data along with the driver reported error messages you should also provide logging of column said to not fit into a target string column allowing your data flow to continue you can add a conditional split transformation to handle it especially if you're able to detect it early log the rows that failed split off error rows to avoid the sequel truncation errors and put those entries into a log the extended Apache spark history server helps to debug and diagnose completed and running spark applications so 

![alt text](/assets/DP203/34-normalize_and_denormalize_values.png)
let's revisit how to normalize and denormalize values normalizing is the process of organizing the data in a relational database to reduce redundancy and improve data integrity it involves several steps such as identifying the purpose and scope of the database defining the entities and attributes that will be stored in it then we will apply a series of normal forms first normal form second normal form third normal form and sometimes additional higher normal forms such as voice cod may also be used we typically use normalized forms in our transaction processing but when we move into analytical processing we typically will talk about denormalization denormalization is a process of reversing or relaxing the normalization of relational databases to improve performance or usability it will involve such things as identifying the queries or operations that are frequently performed on the database and the tables or attributes that are involved in them then we want to apply denormalization techniques such as adding redundant data combining tables creating derived attributes or using precomputed summaries in order to reduce the number of job points the number of aggregations or of calculations that are needed for those queries or operations and always when we perform such operations we want to evaluate the impact that we have had so we will leave valuate the impact of denormalization on the storage space on the data integrity and on the maintenance of the database and ensure that the benefits outweigh the cost 

![alt text](/assets/DP203/35-perform_exploratory_data_analysis.png)
next let's examine how to perform exploratory data analysis exploratory data analysis includes data acquisition data exploration and data evaluation so a data acquisition we want to collect or obtain the data from our various sources such as databases miles API web scraping surveys and so on it's going to involve checking the quality and the quantity and the format of the data and sharing that it meets the requirements and objectives of the analysis from there we moved to expiration and this step involves exploring and visualizing the data using descriptive statistics graphs charts tables and so on it also involves identifying and handling any issues or anomalies in the data such as missing values outliers errors duplicates etcetera it will also involve transforming or manipulating the data to create new features or variables that can enhance the analysis data evaluation involves evaluating and interpreting the results of the data exploration and drawing conclusions or insights from them it also involves communicating and presenting the findings to the stakeholders for audiences using clear and concise language and visuals this will involve identifying any limitations or assumptions of the analysis and suggesting any further steps or action that can be taken based on the findings 

![alt text](/assets/DP203/36-develop_batch_processing_solutions_by_using_datalake-databrick-synapse-ADF.png)
next let's examine how to develop batch processing solutions by using Azure data lake storage has your data breaks as your synapse analytics or ADF a modern data warehouse enables you to collate all of your data at scale easily so you can get to the insides through analytics dashboards operational reporting or advanced analytics for your users the process of building a modern data warehouse will involve ingesting and preparing data and making the data ready for consumption by analytical tools for ingesting at the foundation customers need to build a data lake to store all their data in different data types with Azure data lake storage Gen. 2 or other such storage technologies customers can ingest data using data factory or synapse pipelines this will empower customers to do code free ETL or ELT including preparation and transformation another option available to customers for data preparation would be Azure data breaks for making the data ready as your synapse analytics is present at the heart of the modern data warehouse it is a cloud scale analytical solution that implements a data warehouse using dedicated SQL pool that leverages the massive parallel processing architecture engine to bring together enterprise data warehousing and big data analytics so Azure synapse can be used exclusively and it works well for Greenfield projects but for organizations with existing investments in Azure with Azure data factory with Azure data bricks you can take a hybrid approach and combine them with Azure synapse analytics a key requirement of batch processing is the ability to scale out computations in order to handle a large volume of data we have various technological choices that are available for batch processing and you can choose the solution that's most suitable for your organization's needs 

![alt text](/assets/DP203/37-use_polybase_to_load_data_to_a_SQL_pool.png)
next let's examine how to use polybase to load data to a SQL pool and configure batch size remember Tia aspects to load your data using polybase with these basic steps that you see here you can use polybase for extracting from loading and for transforming your data you should be familiar with TCL scripts to process using polybase but all of our other technologies such as our Azure data factory and our synapse pipelines as well as using the olap connectors from our spark pools will use polybase for any of the ingestion work so use polybase then as the fastest way to ingest data into the dedicated SQL pool but it is also a way that you can leave the data where it is located in the Azure data lake storage and query that interactively 

![alt text](/assets/DP203/38-implement_synapse_link_and_query_the_replicated_data.png)
next let's examine how to implement Azure synapse link and query the replicated data Azure synapse link allows you to interact with a cosmos DB or with an Azure SQL database from your synapse analytics serverless SQL pool or your dedicated SQL pool or even your spark SQL pools the process to set up link is a little different with each of the technologies that you're linking to some of the key things to remember is that when you are creating an Azure synapse link with a container in cosmos DB the analytical store remains in cosmos DB when you set it up with a SQL Server 2022 or later or with an Azure SQL database then the data will be replicated and stored in the analytical store in the dedicated sequel pool and synapse analytics 

![alt text](/assets/DP203/39-create_data_pipelines.png)
next let's examine how to create data pipelines remember the key steps as shown here to create pipelines these pipelines as we're looking at here are created within the Azure synapse analytics you will create them in synapse studio you can add and configure activities and as you see on the slide here the data flow on the design surface is an activity you will specify new or existing data sets had you will connect your activities to define a processing flow 

![alt text](/assets/DP203/40-integrate_Jupiter_notebooks_into_a_data_pipeline.png)
next let's examine how to integrate Jupiter or Python notebooks into a data pipeline there are three steps to integrate a Jupiter or Python notebook into a data pipeline from the notebook page you're gonna select select existing or new pipeline from the ready page you will select toggle parameter cell in the settings tab and then you will add the relevant values so as you look at the steps that we have here add the notebook to the new or existing pipeline you're going to designate the cells within your notebook here as a parameter cell which you will see here at the toggle the parameter cell and inside of the parameter cell you will define variables and default values now you will assign the parameter values in your pipeline and with that you're going to specify what the names are and what the values are that you will pass in to your parameters in your notebook activity and this is how you're able to reuse your notebooks with different values to affect the control or the flow or the processing within your notebook 

![alt text](/assets/DP203/41-upsert_data_in_batch_processing.png)
next let's examine how to upsert data in batch processing upsert activities modify existing records in a target table or they insert new records if no record exists there so we have two major approaches to the absurd of data now for a small number of records you can in fact iterate on a data set of an application we've done this for a long time for every row you can invoke a stored procedure to execute an insert or update or to execute a merge operation this is not necessarily recommended for large data on a dedicated SQL pool we have much better ways that we want to use to accomplish this with that for a large number of records we would leverage bulk insert techniques to upload the entire data set to an Azure SQL database when that's what we're talking about we can execute all the insert or update or merge operations within a single batch to minimize round trips and log rides and maximize throughputs we would use a variation of this for the dedicated SQL pool we want to write our data into BLOB storage or Azure data lake storage we now want to have a polybase table and with the polybase table we can execute a merge statement which is a TCL statement with one pass through the data we can now insert new data or modify the existing rows as our needs may be 

![alt text](/assets/DP203/42-configure_batch_retention_and_revert_data_to_a_previous_state.png)
next let's examine how to revert data to a previous state with a dedicated SQL pool we have two types of restore points automatically user defines restore points snapshots creates restore points however the dedicated SQL pool must be in an active state for restore point creation dedicated SQL pool supports an 8 hour recovery point objective you can restore your data warehouse in the primary region from any one of the snapshots taken in the past seven days user defined restore points enables you to manually trigger snapshots to create restore points of your data warehouse before and after large modification user defined restore points are available for seven days and are automatically deleted on your behalf you cannot change the retention period of the user defined restore points 42 user defined restore points are guaranteed at any point in time so they must be deleted before creating another one 

![alt text](/assets/DP203/43-read_from_and_write_to_a_delta_lake.png)
next let's examine how to read from and write to a delta lake delta lake brings atomicity consistency isolation and durability that is acid transactions to Apache synapse spark pools and to databricks you would use the spark dot read dot format delta method to load a delta table from a given path or use that delta dot table .4 path method to create a delta table object from a given path you would use standard spark data frames or SQL APIs to query or manipulate the data in a delta table you can also use the delta table API to perform delta specific operations such as history merge update delete etcetera to use a pend or overwrite mode with the delta lake you need to follow a few steps you need to specify the format as delta when writing data to a delta lake table using the data frame or SQL API so for example data dot write dot format and in parentheses delta and then dot say you can specify the mode as append or overwrite depending on whether you want to add new data to an existing delta table or replace the existing data with new data so for example data dot write dot format and delta then you will put mode and append optionally you can use the replace where option to selectively override only the data that matches a given predicate 

![alt text](/assets/DP203/44-create_a_stream_processing_solution.png)
next let's examine how to create a stream processing solution by using stream analytics and Azure event hubs the reference architectures here show end to end stream processing pipelines with data bricks and also with stream analytics for reference architecture with databricks the pipeline ingest data from two data sources it performs a join on related records from each stream enriches the results and calculates an average in real time the results are stored for further analysis so for data sources in this architecture there are two data sources that generate data streams in real time our Azure event hubs is an event ingestion service this architecture uses two event hubs instances one for each data source each data source sends a stream of data to the associated event hubs for Azure data bricks this is an Apache spark based analytics platform optimized for the Microsoft Azure cloud services platform the output from Azure databricks job is a series of records which are going to be written into cosmos DB and this particular use case using the Cassandra API this API is used because it supports time series data model and then we will use our data analysis tools such as power BI for data visualization now Azure log analytics can't collect the data from our Azure monitor and stored in a log analytics workspace log analytics queries can be used to analyze and visualize metrics and inspect log messages to identify issues within the application similarly the second diagram shows the reference architecture with stream analytics 

![alt text](/assets/DP203/45-process_data_by_using_spark_structured_streaming.png)
next let's examine how to process data by using spark structured streaming you can access Azure synapse from Azure databricks using give me Azure synapse connector a data source implementation for Apache spark that uses Azure BLOB storage and polybase or the copy statement and Azure synapse to transfer large volumes of data efficiently between an Azure databricks cluster and an Azure synapse instance the spark driver can't connect to an Azure snaps using JDBC with the username and password or oauth 2.0 with a service principal front that indication spark driver and executors to Azure storage account acts as an intermediary to store bulk data when reading from or writing to Azure snaps spark connects to the storage container using one of the built-in connectors the Azure BLOB storage or Azure data lake storage Gen. 2 after you set up an account key and secret for the storage account you can set the forward spark as your storage credentials to true in which case as your snaps connector automatically discovers the account access key set in the notebook session configuration or the global Hadoop configuration and forwards the storage account access key to the connected Azure synapse instance by creating a temporary Azure database scoped credential 

![alt text](/assets/DP203/46-create_windowed_aggregates1-2.png)
next let's examine how to create windowed aggregates stream analytics provides native support for windowing functions that helps other complex stream processing jobs with minimal efforts over these 
![alt text](/assets/DP203/47-create_windowed_aggregates2-2.png)
next two slides we will show five kinds of temporal windows tumbling hopping sliding session and snapshot you should be familiar with what each of these are as well as the sequel to create these window types for each type of aggregation so you will see here for a tumbling window that we that each window begins where the previous window ended there will be no duplicates from one window to the other and the output is produced only at the end of the window a hoppy window you will specify a different time for your output and the amount of time over which you will aggregate data and so you can see the example here of a 10 second hopping window with a 5 second hop which means we will report output every five seconds and we will aggregate over the previous 10 seconds a sliding window generates output anytime the contents of the window changes so if data goes out of scope of the window we will produce output if new data enters the window it will produce output a session window allows you to tell the count of tweets for example that occur within 5 seconds of each other and a snapshot just looks at any particular point in time 

![alt text](/assets/DP203/48-handle_schema_drift.png)
next let's examine how to handle schema drift schema draft is a case where your sources often change the metadata things such as fields columns and types can be added they can be removed but they can be changed on the fly without handlings for schema drift your data flow becomes vulnerable to upstream data source changes so 2 types of schema drift handling are you can handle it at the source or you can handle it at the sink when you're handling it at the source columns coming into your data flow from your source definition are defined as drifted when they're not present in your source projection or when you select the data set for your source ADF for example will automatically take the schema from the data set and create a projection from that data set schema definition so to enable schema drift you will select the allow schema drift checkbox in your source transformation if you handle it at the sink that the sync transformation schema drift is where you're going to write additional columns on top of what is already defined in the sync data schema so to enable schema drift with select allow schema drift in your sink transformation schema drift is enabled and sure the auto mapping slider on the mapping tab is turned on when your data flow has drifted you can access them in your transformations by using the by position or by name expressions to explicitly reference a column either by its relative position or by the name within the projection you can add a column pattern in the derived column or aggregate transformation to match on any combination of name stream position origin or type and then add a rules based mapping and the select or sync transformation to match drifted columns to columns aliases or other via a pattern 

![alt text](/assets/DP203/49-process_time_series_data.png)
next let's examine how to process time series data time series data is a set of values organized as per time a key characteristic of time series data is temporal ordering that organizes events and the order in which they occur and arrive for processing time series based systems such as Internet of Things capture data in real time by using a real time processing architecture Azure IoT hub Azure event hubs for Kafka on HD insight and just data from one or more data sources end to stream processing layer the stream processing layer processes the data to hand off the process data to a machine learning service for predictive analytics or other such downstream services and analytical data stores such as Azure data explorer H base Azure cosmos TB or Azure data lake stores the process data and analytics and reporting application or service such as power BI or open TSDB for H base display the time series data for analysis 

![alt text](/assets/DP203/50-process_data_across_partitions_and_within_one_partiton.png)
next let's examine how to process data across partitions you can scale stream analytics jobs by configuring input partitions and tuning the analytics query definition stream analytics jobs can consume and write different partitions in parallel which increases throughput you can use repartitioning to scale your Azure stream analytics query for scenarios that can't be fully parallelized a stream analytics job can consume and write different partitions in parallel which increases the throughput and embarrassingly parallel job is the most scalable scenario in Azure stream analytics it connects 1 partition of the input to 1 instance of the query to 1 partition in the output some examples of partition values that allow a fully paralleled job might be 8 event hub input partitions and eight event hub output partitions eight event hub input partitions and BLOB storage output or eight event hub input partitions and BLOB storage output partitioned by a custom field with arbitrary cardinality or 8 BLOB storage and put partitions and BLOB storage output or 8 ball storage input partitions and eight event hub output partitions repartitioning or reshuffling is required when you process data on a stream that's not sharded according to the natural input scheme such as a petition ID for event hubs when you repartition each Shard can be processed independently which allows you to linearly scale out your streaming pipeline the two ways to repetition your inputs include using a separate stream analytic Alex job that does the repartitioning so you can create a job that reads input and writes to an event hub output using a partition key this event hub can then serve as input for another stream analytics job where you implement your analytics logic or you can use a single job but do the repartitioning first before your custom analytics login you can also introduce a step in your query that first repartitions the input and this can then be used by other steps in your query so partitioning 

lets you divide data into subsets based on a partition key if your input like maybe event hubs for example is partitioned by a key it's highly recommended to specify this partition key when adding the input to your stream analytics job all Azure stream analytics input can take advantage of partitioning so when you work with stream analytics you can take advantage of partitioning in the outputs as well so 

![alt text](/assets/DP203/51-configure_watermarking_during_processing.png)
next let's revisit how to configure watermarking during processing structured streaming uses watermarks to control the threshold for how long to continue processing updates for a given state entity such as aggregations over a time window or unique keys and a join between 2 streams you should be familiar with using watermarks in order to prevent long running queries or data built up in your structured spark streaming jobs 

![alt text](/assets/DP203/52-scale_resources_streaming_units.png)
next let's examine how to scale resources streaming units and parallelize jobs can help you scale jobs and resources streaming units are the computing resources allocated to execute a stream analytics job they can help you scale jobs as shown on the slide you can choose the manual scale and set the streaming units or choose the custom auto scale method or the streaming units will be set by the system a stream analytics job definition is made-up of at least one streaming input a query and an output partitions in these inputs and outputs can help divide data into subsets based on a partitioning key scaling a stream analytics job leverages these partitions in the input and output a stream analytics job can consume and write different partitions in parallel which will increase the throughput 

![alt text](/assets/DP203/53-create_tests_for_data_pipelines_in_batch_and_stream_processing.png)
next let's examine how to create tests for data pipelines in batch and stream processing as your stream analytics tools for Visual Studio 

lets you test jobs locally from the IDE using live event streams from IoT hub Azure event hub and BLOB storage so the high level steps to create tests for data pipelines are running your queries on automatically sampled incoming data the Azure stream analytics automatically provides events from this streaming inputs you can run queries in the default sample or set time frames for this sample you can running queries on sample data uploaded from a local file local data can be used instead of live data to test your Azure stream analytics query and then troubleshooting errors and input and query size 

![alt text](/assets/DP203/54-optimize_pipelines_for_analytical_or_transactional_purposes.png)
next let's examine how to optimize pipelines for analytical or transactional purposes you could use the repartitioning and parallelization to optimize processing with Azure stream analytics it allows each Shard to be processed independently to linearly scale out streaming pipelines observe and experiment the resource use each of your job to determine the exact number of partitions needed you must adjust the number of streaming units according to physical units needed for each partition use explicit repartitioning to match the optimal partition count to maximize throughput when your job uses SQL database for output a stream analytics job consumes and writes different partitions in parallel to increase throughput for a job to be parallel partitioning keys must be aligned between all inputs all query logic steps and all outputs 

![alt text](/assets/DP203/55-handle_interruptions.png)
next let's examine how to handle interruptions output data error handling policies apply only to data conversion errors that occur when the output event produced by a stream analytics job does not conform to the schema of the target scene you can configure this policy by choosing either retry or drop with retry when an error occurs as your stream analytics retries writing the event indefinitely until the right succeeds there's no timeout for retries eventually all subsequent events are blocked from processing by the event that is retrying this option is the default output error handling process drop well tell Azure stream analytics to drop any output event that results in a data conversion error the dropped events cannot be recovered for reprocessing later 

![alt text](/assets/DP203/56-configure_exception_handling_in_batch_and_stream_processing.png)
next let's examine how to configure exception handling in batch and stream processing you can use a fail activity in a pipeline to throw an error in a pipeline intentionally and customize both its error message and error codes to do that create a fail activity with the UI and ensure you understand the fail activity error message and code so to use a fail activity you're gonna need disperse search for and find fail in the pipeline activities pane and drag the fail activity to the pipeline cameras you'll select this activity on the canvas and on the settings tab you'll edit its details there you will enter a message and an error code these can be literal string expressions or any combination of dynamic expressions functions system variables and so on ensure you're aware of the error messages and error codes they're often set by the developer but some are also set by ADF 

![alt text](/assets/DP203/57-upsert_data_in_stream_processing.png)
next let's examine how to upsert data in stream processing stream analytics integration with Azure cosmos DB allows you to insert or update records in your container based on a given document ID column this is also called an upsert stream analytics uses an optimistic upsert approach updates happen only when an insert fails with a document ID conflict with compatibility level 1.0 stream analytics performs these updates as a patch operation so it it enables partial updates to the document with compatibility level 1.2 upsert behaviorist modified to insert or replace the document stream analytics supports native integration to bulk right into Azure cosmos DB this integration enables writing effectively to Azure cosmos DB while maximizing throughput and efficiently handling throttling requests 

![alt text](/assets/DP203/58-replay_archived_stream_data.png)
next let's examine how to replay archived stream data as your stream analytics allows checkpoint and replay features which may have an impact on job recovery the replay ketchup time estimates the length of the delay due to a service upgrade to estimate the replay catch up time with load the input load them and put event hubs with enough data to cover the largest window size in your query at expected event rates note that the event timestamp should be close to the wall clock time throughout that time period similar to live input feed second she would start the job 3rd you will measure the time between the start time and the time when the first output is generated this time is estimated to lay the job would incur during a service upgrade before if necessary partition your job and increase the number of S years to spread the load out to more nodes if the time is too long you can also reduce the window sizes of your query and perform further aggregations or other stateful processing on the output 

![alt text](/assets/DP203/59-trigger_batches.png)
next let's examine how to trigger batches select the pipeline and click the add trigger and the new click new again and in the box it appears access the new trigger dialog box these are the steps to add a trigger to a synapse pipeline triggers are anything that will cause the pipeline to execute you can create triggers based on a time schedule or based on any event that you can fire from any service inside of Azure this provides an elegant way for you to be able to process data according to your business requirements 

![alt text](/assets/DP203/60-handle_failed_batch_loads.png)
next let's examine how to handle failed batch loads comprehensive error checking can help you identify and diagnose issues that occur in background operations such as pool and node failures pool and node failures can occur in the background operations that need to be to take didn't avoid it so for pool errors these could be due to resize timeout or failure automatic scaling failure or pool deletion failure some issues and their fixes might include a resized timeout insufficient core quota insufficient subnet IP's and insufficient resources automatic scaling failures to be to catch the issue and use the autoscale run property to get information on any errors have pulled to leash and failures you would take action according to the issues there are also a number of other node errors you might need to detect such as start task failures application package container download failures node OS updates and so on since caesar's can occur even when the batch successfully allocates nodes in a pool and render all the nodes unusable it's important to know the status of the nodes being used and which are usable to evoid incurring wasted cost and have a backup for relevant objects such as containers applications packages and start tasks 

![alt text](/assets/DP203/61-validate_batch_loads.png)
next let's examine how to validate batch loads there are three ways to validate batch loads subscription level batch account level and batch resource was subscription level operational event data is collected in several categories by Azure activity log at the subscription level activity log collects events related to account creation deletion and key management for batch accounts at batch account level each bank account it would be validated for example using the Azure monitor feature the Azure monitor feature collects metrics and resource logs for resources within a batch account such as pools jobs and tasks for batch resource validation batch APIs are used to monitor or query the status of resources and batch applications the resources include jobs tasks nodes and pools 

![alt text](/assets/DP203/62-manage_data_pipelines_in_Azure_data_factory_or_synapse.png)
next let's revisit how to manage data pipelines in Azure data factory or Azure synapse the monitoring and management application provides support for data pipelines management and troubleshooting of any issues so to monitor your data pipelines you want to understand pipelines and activity states navigate to the data factory view the state of each activity inside of a pipeline pause and resume pipelines debug pipelines rerun failures in a pipeline create alerts in the Azure portal move data factory to different resource groups or subscriptions 

![alt text](/assets/DP203/63-schedule_data_pipelines_in_ADF_or_Azure_synapse_pipelines.png)
next let's examine how to schedule data pipelines in Azure data factory or Azure synapse pipelines a scheduled trigger allows you to schedule a pipeline to run periodically this could be hourly daily or so on like this so to schedule data pipelines in Azure data factory or Azure synapse pipelines you would access the edit tab to select the new edit trigger from the ad triggers page you would choose trigger and choose the plus or new from the new triggers page specify the schedule details publish the trigger and switch to the pipeline runs tab refresh the list for pipeline runs one thing to note is that you can create a trigger on a time schedule you can also create a trigger off of any event that can be raised in Azure and that could include a BLOB trigger if you're waiting for the arrival of a file and you need to process the pipeline on that file as soon as it arrives 

![alt text](/assets/DP203/64-implement_version_control_for_pipeline_artifacts.png)
next let's examine how to implement version control for pipeline artifacts synapse studio allows you to associate the synapse workspace with a git repository as your DevOps or GitHub snap studio workspace can be associated with only one git repository at a time you would go to the manage hub of the snap studio select get configuration and the source control if you have no repository connected then you would click configure one thing to remember in all of this is the only way you can save a synapse pipeline or Azure data factory pipeline without connecting to source control is to publish that's not going to be very effective for you so in order to save your progress as you work you need to configure your source control 

![alt text](/assets/DP203/65-manage_spark_jobs_in_a_pipeline.png)
next let's examine how to manage spark jobs in a pipeline the spark activity is a data transformation activity by data factory the steps to manage spark jobs in a pipeline are from the data factory page select monitor and manage this starts the monitoring application in another tab reset the start time filter and click apply ensure that the data slice is in ready state now from the activities window section now 

![alt text](/assets/DP203/66-Practice_questions2.png)
let's test your knowledge by answering some practice questions you should remember that the upcoming questions are different from the ones on the actual exam these questions are meant to serve as a review of the topics we discussed and to help give you an idea of the level of knowledge you need for the exam remember that the real exam is about applying the knowledge so the questions on the exam will often give you a scenario and ask you what you would do for a closer experience on the actual exam I strongly encourage you to check out the official practice test 

![1](/assets/DP203/67-question1.png)
question one you need to use spark to analyze data in a parquet file what should you do should you want one load the park file into a data frame to import the data into a table and a serverless SQL pool or three convert the data to a CSV format the correct answer is you should load the parquet file into a data frame 

![3](/assets/DP203/68-question2.png)
question 2 you have loaded the spark data frame with data and you now want to use it in a delta like table what format should you use to write the data frame to storage should you use one CSV 2 park or a three delta the correct answer is 3 delta 

![alt text](/assets/DP203/69-recap.png)
![alt text](/assets/DP203/70-Review.png)
let's recap what we've covered we have looked at transform data by using transact SQL ingest and transform data by using Azure synapse pipelines or ADF designing and implementing incremental loads transforming data by using Apache spark transform data by using Azure stream analytics cleanse data handled duplicate missing and late arriving data split data shred Jason encode and decode data configure error handling for a transformation normalize and denormalize values or performed data exploration analysis 

![alt text](/assets/DP203/71-Review2.png)
we have also looked at developing batch processing solutions by using Azure data lake storage Azure data bricks Azure synapse analytics and ADF use polybase to load to a sequel pool and configure the batch size implement as your synapse link and query the replicated data create data pipelines integrate Jupiter or Python notebooks into a data pipeline upsert data and batch processing configure exception handling and batch processing read from that right to the delta lake 

![alt text](/assets/DP203/72-Review3.png)
create a stream processing solution process data by using spark structured streaming and create windowed aggregates handle schema draft and process time series data process data across partitions and within one partition configured and watermarking during processing scale resources and create tests for data like pipelines and stream processing optimize pipelines for analytical or transactional purposes handle interruptions and configure exception handling and stream processing upsert data and stream processing replay archive stream data trigger batches and handle failed batch loads and validate batch loads manage and schedule data pipelines in ADF or Azure snaps pipelines implement version control for pipeline artifacts and manage spark jobs and a pipeline with that we come to the end of functional group 2 we hope you'll join us for functional Group 3 secure monitor and optimize data storage and data processing

## Secure, monitor, and optimize data storage and data processing (30–35%)
Welcome back my name is Steve Howard and I'm a Microsoft technical trainer this is the DP203 exam prep video series and in this third and last video we will review how to secure monitor and optimize data storage and data processing 
![alt text](/assets/DP203/73-Skills_Measured3.png)
within this group we will learn how to implement data security monitor data storage data processing optimize and troubleshoot data storage and data processing 

![alt text](/assets/DP203/74-Implement_data_masking_and_manage_sensitive_information.png)
let's begin with the first topic in this functional group dynamic data masking ensures limited data exposure to non privileged users and helps prevent unauthorized access to sensitive data so DM is a policy based security feature that helps designate how much sensitive data to reveal so that it has minimal impact on the application layer it hides the sensitive data and a result set of a query that runs over a designated database fields however the data in the database is not changed for Azure synapse analytics the way to set up TDM policy is using PowerShell or rest API dynamic data masking is a policy based security feature so dynamic data masking prevents unauthorized users from seeing sensitive data so a couple of users or Azure Active Directory identities can get unmasked data in the SQL query results as you have set up users with administrator privileges are always excluded from masking and see the original data without any mask masking rules will define the designated fields to be masked including the masking function that is used masking functions control the exposure of data for different scenarios 

![alt text](/assets/DP203/75-encrypt_data_at_rest_and_in_motion.png)
next let's examine how to encrypt data at rest and in motion transparent data encryption helps protect Azure synapse analytics against threats of malicious offline activity by encrypting data at rest TDE encrypts the data as it sits on the disk it performs real time encryption as well as decryption of the data associated with backups and transaction log files at rest without making changes to the application in order to use TDE for Azure synapse analytics it needs to be manually enabled TDE performs encryption and decryption of data at the page level in real time what a page is read into memory it is decrypted it is encrypted before writing it to disk TDE encrypts the entire database storage using a symmetric key called a database encryption key or DEK for short for Azure synapse analytics the TDE protector is set on the server level where it is inherited by all the databases that are attached or aligned to that server the term server refers both to server and to instance when you need to move a database that is protected with TDE within Azure there's no need to decrypt the database as the TDE settings on the source database or primary database are inherited on the target if you export that TDE protected database the exported content is not encrypted it's stored in an unencrypted backpack file you need to protect this backpack file and enable TDE as soon as the import of the backpack file is in the new database 

![alt text](/assets/DP203/76-implement_row_level_and_column_level_security.png)
now let's examine how to implement row level and column level security both row and column level security help enable the design and coding of an application security column level security and Azure synapse analytics is all allow you to restrict column access in order to protect sensitive data the way to implement column level security is by using the grant TCL statement and column level security eliminates the necessity for the introduction of views or filtering out columns to impose access restrictions row level security helps create a group membership or execution context to control both columns and rows in a database table row level security helps implement restrictions on data row access and it is implemented by using the create security policy statement 

![alt text](/assets/DP203/77-implement_Azure_role_based_access_control-RBAC.png)
next let's examine how to implement Azure role based access control or rbac use role based access control to control access to your resources a sensitive data here when we're talking about this there are several considerations that we should account for when working with our sensitive data including maintaining a list of data stores that contain sensitive information isolating the systems that store or process that Steve formation monitor and block unauthorized transfer of sensitive information encrypt any sensitive information that goes in transit and encrypt any sensitive information and rest 

![alt text](/assets/DP203/78-implement_POSIX-like_access_control_lists_ACLs_for_data_lake_storage_Gen2.png)
next let's examine how to implement posix like access control lists for data lake storage Gen. 2 access control list or ACL's secure data for Azure role based access control at portable operating systems interface for Unix or posix a security principle may be associated with access level for files and directories these associations are captured in an access control list or ACL there are two kinds of access control this access ACL's control access to an object files and directories both have access ACL's and default ACL's are templates of ACL's associated with the directory that determines the access ACL for any child items that are created under that directory files do not have default ACL's Will allow you to add and remove users or service principles without the need to reapply ACL's to an entire directory structure instead you could just add or remove users and service principles from the appropriate Azure Active Directory security group for users who need readonly access you should assign a role named storage BLOB data reader for users which need read write access you should assign a role named storage BLOB data contributor note that these are different from storage Raider storage reader writer or administrator roles which do not give access to the data itself 

![alt text](/assets/DP203/79-implement_a_data_retention_policy.png)
next let's examine how to implement a data retention policy Azure BLOB storage lifecycle management offers a rule based policy that helps in cost savings for GP V2 and BLOB storage accounts datasets have unique life cycles where early in the life cycle data is accessed often but as the data ages possibly the need for access drops use the policy to transition your data to the appropriate access tiers or expire at the end of the data slide cycle so a life cycle management policy allows you to transition blobs from cool to hot immediately if used to optimize for performance transition blobs BLOB versions and BLOB snapshots to cooler storage tier as hot cool or hot to archive or cool to archive if not accessed or modified for some time to optimize for cost define rules to be run once per day at the storage account level and apply rules to containers or a subset of blobs using name prefixes or BLOB index tags as filters 

![alt text](/assets/DP203/80-implement_secure_endpoints.png)
next let's examine how to implement secure endpoints synapse analytics network security can be achieved by creating firewall rules virtual networks and private endpoints firewall rules enable you to define the type of traffic that's allowed or denied access to an Azure synapse workspace using the originating IP address of the client that is trying to access the Azure synapse workspace now as your virtual networks enables private networks and Azure V net enables many types of Azure resources such as Azure synapse analytics to securely communicate with other virtual networks the Internet and on Prem networks private link enables you to access Azure services such as Azure storage and Azure cosmos DB add Azure host to customer partner services from your Azure virtual network securely 

![alt text](/assets/DP203/81-implement_resource_tokens_in_Azure_databricks.png)
next let's examine how to implement resource tokens in Azure databricks you'll generate resource tokens in Azure databricks by creating a databricks cluster and then generating a resource token from inside of your databricks workspace so you could generate those resource tokens by using the following steps from the generate new token dialog box enter the relevant comments and click generate then you copy the token and click done it's that simple the resource token is displayed on the user settings page 

![alt text](/assets/DP203/82-write_encrypted_data_to_tables_or_Parquet_files.png)
next let's examine how to write encrypted data to table or Parquet files.there are various configurations for apache spark, and Databricks which are available to you. now since spark 3.2 column or encryption has been supported for parkade tables with Apache parquet 1.12 or later parque uses the envelope encryption practice where file parts are encrypted with the data encryption key or TK's and the DK's are encrypted with the master encryption keys or MEK's the DEK's are randomly generated by part K for each encrypted file or column the MAKS are generated stored and managed in a key management service of the user's choice so for data bricks you will enable customer managed keys for encryption so this supports adding a customer managed need to help protect and control access to data there are three customer managed key features for different types of data the customer managed keys for managed disks customer managed keys for managed services or customer managed keys for DPFS root so you'll encrypt queries query history and query results and you can use your own key from the Azure key vault to encrypt the databricks SQL queries and your query history stored in the Azure database control plane you want to enable encryption for DBFS and to do that the Azure storage automatically encrypts all data in the storage account including TMPFS rest storage you can optionally enable encryption that the Azure storage infrastructure level 



![alt text](/assets/DP203/83-load_a_data_frame_with_sensitive_information.png)
next let's examine how to load a data frame with sensitive information let's say we're loading data with an encrypted column encrypted because it's sensitive what would they to be different let's look here and find out the example on the slide shows how you can use Azure key vault to store and manage secrets such as connection strings passwords that are used to access sensitive data and so on like that from there you will use what is native and your spark implementation to handle and encrypt the sensitive data 

![alt text](/assets/DP203/84-implement_logging_used-by_Azure_monitor.png)
next let's examine how to implement logging used by Azure monitor use Azure monitor logs to collect and organize log and perform a stata from monitor resources uh you can set your diagnostic settings to use the options such as log analytics a storage account when you need cheap storage or event hub if you need real time processing based on that you can also leverage various categories such as SQL insights automatic tuning Gray store runtime etcetera and when you are monitoring for performance there will be key metrics that you will look for and these can include the basic set the instance in app advanced set or workload management key metrics establish your baseline and understand what it looks like when everything performs well that allows you to understand what is changed when things do not perform well 

![alt text](/assets/DP203/85-configure_monitoring_services.png)
next let's examine how to configure monitoring services the overall monitoring strategy must take into consideration not only scalability thought reliability their first structure application and dependence services and application performance as well some of the things that you're gonna need to monitor for performance efficiency would include your data collection modeling to build a robust application that's filed that application and resource level data correlated and evaluated together to optimize the detection of issues and troubleshooting of detected issues data is monitored using Azure monitor metrics and Azure monitor logs now log aggregation techniques such as Azure log analytics or Splunk are used to collate logs and metrics across all application components including infrastructural components for subsequent evaluation resources may include Azure IAS and pass services as well as third party appliances and firewalls or anti malware solutions used in the application the activity log menu item displays entries in the activity log for the current resource the alerts page displays any recent alerts that were fired for the resource for the purposes of scalability analyzing the metrics would allow you to scale up scale out scale in and scale down the ability to scale dynamically is one of the biggest values of moving to the cloud and the application performance monitoring with this technologies such as application insights can be used to manage the performance and availability of the application aggregating application level logs and events for subsequent interpretation is designed to help you continuously improve performance and usability 

![alt text](/assets/DP203/86-monitor_stream_processing.png)
next let's examine how to monitor your stream processing stream analytics offers different metrics that can be used to monitor and troubleshoot your query and job performance to see as your stream analytics job metrics browse to the stream analytics job you're interested in seeing metrics for and then choose the monitoring blade in the left pane and select the metrics the metrics page will be shown uh for adding this specific metric you'd like to check and that's what you see as we're looking at this slide alternatively you can go to the monitoring section on the overview page but when you do that it will be up to you to set the scope which is already set for you if you chose the other approach dream analytics offers two types of logs activity logs which are always on that give insights into operations performed on jobs and resource logs which are configurable that provide better insights into what happens with the job resource logs start when the job is created and end when the job is deleted 

![alt text](/assets/DP203/87-measure_performance_of_data_movement.png)
next let's examine how to measure performance of data movement you can monitor the status of Azure synapse link and synapse studio or in Azure monitor to get to Azure monitor you would follow the same processes as you did on the previous slide for Azure stream analytics 

![alt text](/assets/DP203/88-monitor_data_pipeline_performance.png)
but you can also monitor an individual run of a pipeline after it is published by going to the monitor page and Azure synapse studio from the monitor page you can choose your pipeline runs and then choose the run that you need to evaluate from inside of that you can now drill in and see each step and each flow within the pipeline that is run and drill in and see the status as well as the amount of time that it was that was consumed by that particular activity 

![alt text](/assets/DP203/89-manage_query_performance.png)
next let's examine how to manage query performance here we will talk about different ways that you can use to monitor SQL requests in your dedicated and serverless SQL pools one of the first things to understand yes that the underlying technology of a serverless sequel pool and a dedicated sequel pool are different they have come from different languages and that means the set of dynamic management views or DMV's that you can query to see such things as query stats and query history and query plans are different so you'll need to refer to your documentation on how to access that from each of these you also have with serverless monitoring a few key ways such as the synapse monitor hub and the dynamic and query performance insights library as well as Azure log analytics so 

![alt text](/assets/DP203/90-schedule_and_monitor_pipeline_tests.png)
next let's examine how to schedule and monitor pipeline tests here we'll look at how we can schedule and monitor some of our pipeline activities now we've talked about setting up triggers previously and triggers are what you will use for Azure data factory more for synapse pipeline to start the execution of a job now we do not typically sit and watch a job execute and so we will need to come back to the tools that we have add such things as monitor inside of synapse to pick a specific pipeline run in order to see the success or failure and what the progress was as we as we step through in our pipeline 

![alt text](/assets/DP203/91-interpret_Azure_monitor_metrics_and_logs.png)
next let's examine how to interpret Azure monitor metrics and logs monitors this sure your applications stay up and running in a healthy state by providing relevant data so as you're monitor provides base level infrastructure metrics and logs for most of your Azure services monitor it helps you to avoid potential problems by looking at what happened in past problems so it's important as you set up monitor to establish a baseline we want to understand is what do our key metrics look like when everything is performing well when things stop performing well we need to be able to pinpoint what has changed or to be able to look and see did I run out of a resource do I need to scale or is there another approach that would work better in order to optimize my process 

![alt text](/assets/DP203/92-implement_pipeline_alert_strategy.png)
next let's examine how to implement pipeline alert strategy diagnostic settings for Azure data factory send logs to log analytics and have alerts configured for a set of predefined conditions to alert an administrator for activities but that's not the only thing that you can do with this you can set up alerts to execute an automation runbook fire and Azure function app or other things in order to automate the response to known conditions inside of your applications in our services in Azure you can also have them notify someone whenever additional evaluation or human intervention is necessary 

![alt text](/assets/DP203/93-handle_skew_and_data.png)
next let's examine how to handle skew and data you can handle skew and data in Apache spark and synapse dedicated sequel pools so first of all we need to detect it the diagnosis tab on the Apache spark history server includes data skew at the time skew as you can see on the slide here now for your dedicated sequel pool we could determine if the data has skewed by using DBCC PDW show space used The Rose near distributed table should be spread evenly across distributions for a ballast performance now with a round drop in distribution on insert you should get a very even distribution but especially when you're dealing with hash distributions you should look at the distribution of data in the column that you are using as a distribution key or a hash key this should have a large number of unique values in it having most of those values as one particular value will cause data skew and so we want to have an even distribution in order to optimize our performance so it's important for us to look for data skew and then we may also need to use such techniques as going from a hash distribution to a round Robin distribution in order to handle these things everything has a trade off understand the trade off here between the data skew which will cause a hot hot note versus the round drop and which can give you more data movement at query time 

![alt text](/assets/DP203/94-handle_data_spill.png)
next let's examine how to handle data spill data spillage is when a confidential document is released into an untrusted environment when we have data spillage the workflow for managing our data spillage incidents may include these steps such as manage who can access the case and set compliance boundaries create an E discovery case and an E discovery case is gonna provide an effective way to manage your data spillage investigation and you can add members to the role group you can that you created in step one and add the role group as a member of a new be discovery case you also got a need to search for the spilled data now that you have created a case and managed access you can use the case to iteratively search to find the spilled data and identify the mailboxes that contain the spill down now review and validate your case findings you may want to use message trace logs to check how spilled data was shared so to further investigate if the e-mail spilled data was shared you can optionally query the message trace logs with the sender information and the date range information that you gathered and the previous step now prepare your mailboxes so after you've reviewed validated the search and it contains only the messages that must be deleted you need to collect the list of the e-mail addresses and other things such as this that permanently delete the spilled data verify and provide proof of deletion and audit 

![alt text](/assets/DP203/95-optimize_resource_management.png)
next let's examine how to optimize resource management optimizing resource management helps maintaining resources effectively ensuring highly efficient resource utilization and maximizing return on investment the three high level concepts to optimize resource management are workload classification workload importance and workload isolation now you will notice that these things are set inside of your dedicated sequel pool they're there to ensure that for example when the CEO needs to run reports they have the appropriate resources available to them and we do not allow lower priority workloads to dominate the entire cluster 

![alt text](/assets/DP203/96-tune_queries_using_the_cache.png)
next let's examine how to tune queries using the cache result set cashing on the dedicated SQL pool improves query performance and reduces compute resource usage on result set cashing is enabled dedicated SQL pool automatically caches query results and the user database for repetitive use this allows subsequent query executions to get results directly from the persistent cache so that recomputation is not needed additionally queries using cached results do not use any concurrency slots and thus do not count against existing concurrency limits for security users can only access the cash results if they have the same data access permission as the users creating the cash results once results set cashing is turned on for a database results are cached for all queries until the cache is full except for just a few specific queries a cash result sets is reused for a query if all of the following requirements are met the user who's running the query has access to all the tables referenced in the query there's an exact match between the new query and the previous query that generated the result set cash and there's no data or schema changes in the table where the cached result set was generated from the maximum size of result set cash is one terabyte per database and the cash results are automatically invalidated when the underlying query data changes 

![alt text](/assets/DP203/97-troubleshoot_a_failed_spark_job.png)
next let's examine how to troubleshoot a failed spark job troubleshooting a fail spark job consists of three steps we're gonna need to identify the cause of failure using the runs tab OK and then we're gonna need to fix the cause of failure using the edit task feature then rerun failed and skip task by running only the subset of unsuccessful tasks and any dependent task so the specifically troubleshoot a failed job you would click the jobs and the sidebar the Azure databricks job UI we're dealing with data bricks you would select a job in the name column view the active runs and completed runs including any failed runs in the runs job then view a history of the runs for the job successful and unsuccessful then a task run may be unsuccessful because it what because it failed or maybe it was just skipped using the matrix view you can quickly identify the task failures for your job run now you wanna hover over a failed task to see associated metadata this metadata includes a start and end dates the status the duration cluster details and in some cases an error message so to help identify the cause of a failure click the failed task and the task run detail pages up here display the output error message and associated metadata for that task and search that for the specific causes of your failure 

![alt text](/assets/DP203/98-troubleshoot_a_failed_pipeline_run.png)
next let's examine how to troubleshoot a failed pipeline run as your data factory can help build and develop iterative debug factory pipelines while developing a data integration solution authoring A pipeline using the pipeline canvas you can test your activities and pipelines by using the debug capability so in Azure data factory you can test the pipeline into end or you can set breakpoints in a debug mode to interactively see the results of each step when you build or debug your pipeline so debug and publish your pipeline as you create or modify a running pipeline I'll tear you could see the results of each activity in the output tab of the pipeline canvas now for mapping a data flow debug during the building of mapping flows you can interactively watch how the data shapes and transformations are executing so that you can debug them so now for debug settings each debug session that is started from the Azure data factory user interface is considered a new session with its own spark cluster and then for the monitoring debug runs in order to monitor you can check the output tab but only for the most recent run that occurred in the browsing session since it does not show the history 

![alt text](/assets/DP203/15-Practice_questions.png)
now let's test your knowledge by answering some practice questions it's important to remember that the upcoming questions are different from the ones on the actual exam these questions are meant to serve as a review of the topics we discussed and to help give you an idea of the level of knowledge you need for the exam remember that the real exam is about applying the knowledge so the questions on the exam will often give you a scenario and ask you what you would do for a closer experience of the actual exam I strongly encourage you to check out the official practice test 

![1](/assets/DP203/99-questions1.png)
question one which of the following methods is used to protect Azure synapse analytics dedicated pools against malicious activity is it blind transparent data encryption 2 column level security 3 row level security or 4 role based access control the correct answer is transparent data encryption keep in mind this is encryption at rest encryption on the disk and so this would correlate with the offline activity 

![2](/assets/DP203/100-questions1.png)
question 2 when you are temporarily landing data in an empty table in a dedicated SQL pool what table structure indexing structure should you use for the fastest load operation is it 1 clustered column store indexes two heap tables 3 clustered and non clustered indexes or 4 data skew the correct answer is heat tables but this is a good example of reading the question carefully the question asks only about the load operation and not about your overall process so you can load data into heap tables faster than you can in other structures but that but if other data structures are needed subsequently in your processing of ELT or ETL then you may need to consider loading into other types of structures 

![2](/assets/DP203/18-Recap.png)
now let's revisit the topics covered in this video 

![alt text](/assets/DP203/101-review.png)
in this video we've covered implementing data masking encryption data at rest and in motion implementing row level and column level security and preventing Azure role based access control implementing posix like access control list for data lake storage Gen. 2 implementing a data retention policy implementing secure endpoints both private and public implementing resource tokens in Azure databricks writing encrypted data to tables or park files managing sensitive information and preventing logging used by Azure monitor 

![alt text](/assets/DP203/102-review2.png)
we've also looked at how to configure monitoring services monitor stream processing measure performance of data movement monitor data pipeline performance measure query performance schedule and monitor pipeline tests interpret Azure monitor metrics and logs implement a pipe Line alert strategy handle skew and data handle data spill optimized resource management 

![alt text](/assets/DP203/103-review3.png)
we've also looked at turning queries by using cash troubleshooting a failed spark job and troubleshooting a failed pipeline run 

with that we come to the end of functional Group 3 and the end of the DP203 video series we covered how to design and implement data storage develop data processing secure monitor and optimize data storage and data processing we hope this series gives you an idea of the areas you're strong at and those which you need to revisit if you feel ready you can also attempt the official practice test and For more information you could visit AKA dot MS/DP-203 dash exam on behalf of all of us at Microsoft good luck to you on your exam

# Microsoft Learning Path
## Get started with data engineering on Azure
 - data engineer is the primary role responsible for integrating(การบูรณาการ), transforming(แปลง), and consolidating data(การรวมข้อมูล) from various structured(มีโครงสร้าง) and unstructured(ไม่มีโครงสร้าง) data systems into structures that are suitable(เหมาะสม) for building analytics solutions(โซลูชันการวิเคราะห์)
 - An Azure data engineer also helps ensure(ให้แน่ใจว่า) that data pipelines(ไปป์ไลน์ข้อมูล) and data stores(การจัดเก็บข้อมูล) are high-performing(มีประสิทธิภาพสูง ), efficient(มีประสิทธิภาพ), organized(จัดระเบียบ), and reliable(เชื่อถือได้), given a specific set of business requirements and constraints.
### Introduction to data engineering on Azure
### Introduction to Azure Data Lake Storage Gen2
- A data lake provides file-based storage 
- supports high scalability for massive volumes of data
- can store structured, semi-structured, and unstructured files
- big data processing technologies, such as Apache Spark.
#### Understand Azure Data Lake Storage Gen2
- Data Lake Storage is a comprehensive, massively scalable, secure, and cost-effective
- solution for high performance analytics built in
- tiering and data lifecycle management capabilities of Blob storage
- high-availability, security, and durability capabilities of Azure Storage.
##### Benefits
- Data Lake Storage Gen2 as the basis(พื้นฐาน) for both real-time and batch solutions
##### Hadoop compatible access
- treat(ทำเสมือนว่า) the data as if it's stored in a Hadoop Distributed File System (HDFS)
- access it through compute technologies including Azure Databricks, Azure HDInsight, and Azure Synapse Analytics without moving the data between environments
- parquet format support
##### Security
- supports access control lists (ACLs) (รายการควบคุมการเข้าถึง)
- supports Portable Operating System Interface (POSIX) (ไม่สืบทอดสิทธิ์ของไดเร็กทอรีหลัก)
- set permissions at a directory level or file level
- configurable through technologies such as Hive and Spark or utilities such as Azure Storage Explorer
- All data that is stored is encrypted at rest by using(เมื่อไม่ได้ใช้งาน) either Microsoft or customer-managed keys
##### Performance
- stored data into a hierarchy of directories and subdirectories (like a file system)
- data processing requires less computational resources
- reducing both the time and cost
##### Data redundancy (ซ้ำซ้อนของข้อมูล)
- single data center with locally redundant storage (LRS)
- secondary region by using the Geo-redundant storage (GRS)
#### Enable Azure Data Lake Storage Gen2 in Azure Storage
- select the option to **Enable hierarchical namespace** in the **Advanced** page at create **Storage account**
![](https://learn.microsoft.com/en-us/training/data-ai-cert/introduction-to-azure-data-lake-storage/media/3-create-storage-account-advanced.png)
- (you already have an Azure Storage account)use **Data Lake Gen2 upgrade** wizard in the Azure portal page
![](https://learn.microsoft.com/en-us/training/data-ai-cert/introduction-to-azure-data-lake-storage/media/3-data-lake-upgrade.png)
#### Compare Azure Data Lake Store to Azure Blob storage
- Blob Storage
  - Blob names can include "/" characters to organize blobs into virtual "folders".(ใช้ตัวอักษร "/" ในชื่อทำให้เสมือนว่าใช้งาน Folder ได้ แต่จริงๆ เก็บแบบ **single-level hierarchy** หรือ **flat** namespace)

  ![](https://learn.microsoft.com/en-us/training/data-ai-cert/introduction-to-azure-data-lake-storage/media/blob-store.png)
  - access this data by using HTTP or HTTPs

- Data Lake Storage Gen2
  - hierarchical namespace ทำให้ย้าย ลบ เปลี่ยนชื่อ directory ได้อิสระ in single atomic operation
  
>Note : If you want to store data without performing analysis on the data, set the Hierarchical Namespace option to Disabled
#### Understand the stages for processing big data
- Data Lake use case:
  - An enterprise data warehouse.
  - Advanced analytics against big data.
  - A real-time analytical solution.
- stages for processing big data solutions that are common to all architectures:
- **Ingest** 
  - for batch movement of data, pipelines in 
    - Azure Synapse Analytics
    - Azure Data Factory
  - For real-time ingestion of data, 
    - Apache Kafka for HDInsight
    - Stream Analytics
- **Store**
  - secure
  - scalable storage
  - compatible with commonly used big data processing technologies.
- **Prep and train**
  - used to perform data preparation and model training and scoring for machine learning solutions
  - technologies used in this phase: 
    - Azure Synapse Analytics
    - Azure Databricks
    - Azure HDInsight
    - Azure Machine Learning
- **Model and serve**
  - visualization tools such as Microsoft Power BI
  - analytical data stores such as Azure Synapse Analytics.
#### Use Azure Data Lake Storage Gen2 in data analytics workloads
##### Big data processing and analytics
- big data services such as Azure Synapse Analytics, Azure Databricks, and Azure HDInsight
- data processing frameworks such as Apache Spark, Hive, and Hadoop
- performed in parallel
- high-performance
- scalability
##### Data warehousing
- data is extracted from operational data stores, such as Azure SQL database or Azure Cosmos DB, and transformed into structures more suitable for analytical workloads(ข้อมูลถูกดึงออกมาจากOLTP เช่น Azure SQL database หรือ Azure Cosmos DB แล้วTransform เป็นข้อมูลที่เหมาะสมกับการanalytical อาจจะเก็บ ใน Data lake ก็ได้ หรือ เก็บใน Warehouse ก็ได้ ก่อนใช้คุณสมบัติ **external tables** อ่านข้อมูลจาก Data lake ทำให้เกิดเป็น **data lakehouse** architecture)
- 
[ต่อ](https://learn.microsoft.com/en-us/training/modules/introduction-to-azure-data-lake-storage/6-use-cases)
##### Real-time data analytics
##### Data science and machine learning

### Azure Synapse Analytics (CHALLENGE COLLECTION)
#### Introduction to Azure Synapse Analytics
- Identify the business problems that Azure Synapse Analytics addresses.
- Describe core capabilities of Azure Synapse Analytics.
- Determine when to use Azure Synapse Analytics.
##### Introduction
- you'll learn how to:
  - Identify the business problems that Azure Synapse Analytics addresses.
  - Describe core capabilities of Azure Synapse Analytics.
  - Determine when to use Azure Synapse Analytics.
##### What is Azure Synapse Analytics
defines four common types of analytical technique
  - descriptive วิเคราะห์เชิงพรรณนา (อธิบายสิ่งที่เกิดขึ้นตามวัตถุประสงค์และช่วงเวลาที่กำหนดนั่นเอง)
    - "เกิดอะไรขึ้นในธุรกิจของฉัน"
  - diagnostic การวินิจฉัย (อธิบายสาเหตุของสิ่งที่เกิดขึ้น)
    - "เหตุใดจึงเกิดขึ้น"
  - predictive การคาดการณ์ (คาดการณ์อนาคต)
    - “สิ่งที่มีแนวโน้มที่จะเกิดขึ้นในอนาคตตามแนวโน้มและรูปแบบก่อนหน้านี้”
  - prescriptive เชิงกำหนด (ให้คำแนะนำที่เหมาะสมเพื่อรับมือการคาดการณ์)
    - ตัดสินใจได้อัตโนมัติโดยวิเคราะห์ข้อมูลแบบreal-time หรือ near real-time

![](https://learn.microsoft.com/en-us/training/wwl-data-ai/introduction-azure-synapse-analytics/media/types-analytics.png)

##### How Azure Synapse Analytics works
- **Creating and using an Azure Synapse Analytics workspace**
  - Azure subscription interactively by using the Azure portal
  - automate deployment by using Azure PowerShell
  - the Azure command-line interface (CLI)
  - with an Azure Resource Manager or Bicep template
- manage the services in 
  - Synapse Studio (web-based portal for Azure Synapse Analytics)

![](https://learn.microsoft.com/en-us/training/wwl-data-ai/introduction-azure-synapse-analytics/media/synapse-studio.png)
- **Working with files in a data lake**
  - implemented as a linked service(บริการที่เชื่อมโยง) to an Azure Data Lake Storage Gen2 container
  - can add linked services for multiple data lakes

![](https://learn.microsoft.com/en-us/training/wwl-data-ai/introduction-azure-synapse-analytics/media/data-lake-store.png)

- **Ingesting and transforming data with pipelines**
  - Azure Synapse Analytics includes built-in support for
    - creating ,running ,managing pipelines 
  - orchestrate the activities เช่น Copy Move และ อืนๆ
    - retrieve data from a range of sources,
    - transform the data as required
    - load the resulting transformed data into an analytical store

![](https://learn.microsoft.com/en-us/training/wwl-data-ai/introduction-azure-synapse-analytics/media/synapse-pipeline.png)

>Note: Pipelines in **Azure Synapse Analytics** are based on the same as **Azure Data Factory**

> Pipelines in **Azure Synapse Analytics** = Pipelines in **Azure Data Factory**

- **Querying and manipulating data with SQL**
  - Azure Synapse Analytics supports SQL-based data querying and manipulation through two kinds of SQL pool that are based on the SQL Server relational database engine:
    - built-in serverless pool
      - เหมาะกับการ query file-based data in a data lake
    - Custom dedicated SQL pools ใช้ทำ data warehouses สำหรับเก็บ data modeling and reporting
  - ใช้การกระจายตัว query processing model to parallelize SQL operations (**highly scalable solution**)

![](https://learn.microsoft.com/en-us/training/wwl-data-ai/introduction-azure-synapse-analytics/media/synapse-sql.png)

- **Processing and analyzing data with Apache Spark**
  - distributed processing of files in a data lake
  - Languages supported in Spark include Python, Scala, Java, SQL, and C#.
  - can create one or more Spark pools
  - use interactive **notebooks** to combine code and notes

![](https://learn.microsoft.com/en-us/training/wwl-data-ai/introduction-azure-synapse-analytics/media/synapse-spark.png)

- **Exploring data with Data Explorer**
  - Synapse Analytics that is based on the Azure Data Explorer service
  - query syntax named **Kusto Query Language** (KQL)
    - high performance, low-latency analysis of batch and streaming data.

![](https://learn.microsoft.com/en-us/training/wwl-data-ai/introduction-azure-synapse-analytics/media/synapse-data-explorer.png)

- **Integrating with other Azure data services**
  - Azure Synapse Link
    - near-realtime synchronization between
      - Azure Cosmos DB
      - Azure SQL Database
      - SQL Server
      - Microsoft Power Platform Dataverse
  - Microsoft Power BI
  - Microsoft Purview
    - organizations to catalog data assets in Azure Synapse Analytics
      - find data assets and track data lineage
  - Azure Machine Learning
    - integrate predictive model training and consumption

##### When to use Azure Synapse Analytics
- Large-scale data warehousing
  - Data warehousing includes the need to integrate all data, including big data
- Advanced analytics
  - perform predictive analytics
  - integrating with other technologies such as Azure Machine Learning
- Data exploration and discovery
  - serverless SQL pool for query data lake, supports data discovery, diagnostic analytics, and exploratory data analysis.
- Real time analytics
  - can capture, store and analyze data in real-time or near-real time (**Azure Synapse Link**)
  - Azure Stream Analytics
  - Azure Data Explorer
- Data integration
  - Pipelines enables you to ingest, prepare, model and serve the data
- Integrated analytics

##### Exercise - Explore Azure Synapse Analytics
[Exercise-Link](https://learn.microsoft.com/en-us/training/modules/introduction-azure-synapse-analytics/4a-exercise-explore-synapse)

#### Survey the Components of Azure Synapse Analytics
##### Introduction
In this lesson, you will:
- Create Azure Synapse Analytics Workspace
- Describe Azure Synapse SQL
- Explain Apache Spark in Azure Synapse Analytics
- Orchestrate Data Integration with Azure Synapse Pipelines
- Visualize your analytics with Power BI
- Understand Hybrid Transactional Analytical Processing with Azure Synapse Link

##### Create Azure Synapse Analytics workspace
เมื่อ Create workspace ของ Azure Synapse Analytics จะประกอบไปด้วย
- Azure Data Lake Storage Gen2 ทำหน้าที่เป็นที่เก็บข้อมูลหลักและคอนเทนเนอร์
- Apache Spark พื้นที่ทำงานจัดเก็บข้อมูลในตาราง และจัดเก็บบันทึกแอปพลิเคชัน Spark ไว้ใต้โฟลเดอร์ชื่อ /synapse/workspacename
- สร้าง pools ข้อมูล, SQL pools, หรือ Spark pools ตามต้องการได้
- ระบบเมตาดาต้าที่เข้ากันได้กับ Hive ทำให้ Spark เข้าถึงข้อมูลใน Data Lake ได้ (Parquet, CSV, TSV และ JSON )

![](https://learn.microsoft.com/en-us/training/wwl-data-ai/survey-components-of-azure-synapse-analytics/media/azure-synapse-workspace.png)

##### Exercise - Create and manage Azure Synapse Analytics workspace
To create an Azure Synapse Analytics workspace, perform the following steps:

1. In the Azure portal, click on + **Create a resource**.
2. In the text box, replace “Search the Marketplace” with the text “Azure Synapse” and then click on Azure Synapse Analytics.
3. Click on **Create**.
![](https://learn.microsoft.com/en-us/training/wwl-data-ai/survey-components-of-azure-synapse-analytics/media/create-azure-synapse-workspace.png)

4. In **Basics**, enter your preferred Subscription, Resource group, Region, and then type in a workspace name.
![](https://learn.microsoft.com/en-us/training/wwl-data-ai/survey-components-of-azure-synapse-analytics/media/create-azure-synapse-workspace-basics-screen.png)
5. You need to select a Data Lake Storage Gen2 account and a container in that account to create a workspace. The simplest choice it to create a new one. By clicking on the **Create new** hyperlink, but there is the option to use an existing one by click on the drop-down list.
6. Select **Review + create > Create**. Your workspace is ready in a few minutes.

##### Describe Azure Synapse Analytics SQL
- data warehouse solutions, or to perform data virtualization
- data stored in relational tables
- The data is retrieved, cleansed, and transformed from a range of source data system
- served in a structured relational format commonly referred to as a star schema.
![](https://learn.microsoft.com/en-us/training/wwl-data-ai/survey-components-of-azure-synapse-analytics/media/relational-star-schema.png)
- ETL process by services such as Azure Synapse pipelines, or Azure Data Factory
- **dedicated SQL Pools** refers to the **data warehousing** features
- **serverless SQL** model is ideal for unplanned or **ad hoc** workloads that the **diagnostic** analytics

##### Explain Apache Spark in Azure Synapse Analytics
- The primary use case for Apache Spark for Azure Synapse Analytics is to process big data workloads that cannot be handled by Azure Synapse SQL
-  Azure Synapse Analytics can also integrate with other Spark implementations such as Azure Databricks
-  Spark pools in Azure Synapse Analytics come with Anaconda libraries pre-installed.
- processes large amounts of data in memory (ประมวลผลข้อมูลจำนวนมากในหน่วยความจำ)
- in Azure Synapse Analytics have name "Spark pools"
- ทำงานบน Spark pool clusters และรับงานจาก notebooks
- clusters allow processing of data to be parallelized
- consists of a Spark Driver and Worker nodes
  - Driver node sends work to the Worker nodes
  - you can configure the number of nodes are required in task

![](https://learn.microsoft.com/en-us/training/wwl-data-ai/survey-components-of-azure-synapse-analytics/media/apache-spark-architecture.png)

- **Speed and efficiency** (ความเร็วและประสิทธิภาพ)
  - Create in 2 minutes for < 60 nodes | 5 minutes for > 60 nodes
  - shuts down in 5 minutes(default) after the last job executed เว้นจะยังเชื่อมต่อกับ notebook connection อยู่.
- **Ease of creation**(ความง่ายในการสร้าง)
  - Create with Azure portal, Azure PowerShell, or the Synapse Analytics .NET SDK.
- **Ease of use**(สะดวกในการใช้)
  - ทำงานบน interactive notebooks ทำให้ data processing และ visualization พร้อมๆกันได้.
- **Scalability**
  - can have Auto-Scale enabled
  - shut down with no loss of data since all the data is stored in Azure Storage or Data Lake Storage.
- **Support for Azure Data Lake Storage Generation 2**

##### Exercise - Create pools in Azure Synapse Analytics
To create an Azure Synapse Analytics pool, perform the following steps:
- **For Azure Synapse SQL pool**
1. Launch Azure Synapse Studio. The URL can be found in the Azure Synapse Workspace created in the Azure portal.

2. In Azure Synapse Studio, navigate to the Management Hub in the left navigation by selecting the Manage icon.

![](https://learn.microsoft.com/en-us/training/wwl-data-ai/survey-components-of-azure-synapse-analytics/media/azure-synapse-studio-management-hub.png)

3. Once in the Management Hub, navigate to the SQL pools section to see the current list of SQL pools that are available in the workspace.

4. Select + New command and the new SQL pool create wizard will appear.

![](https://learn.microsoft.com/en-us/training/wwl-data-ai/survey-components-of-azure-synapse-analytics/media/create-sql-pool-basics-screen.png)

5. Enter the following details in the Basics tab:
   - SQL pool name: SQLPool01
   - Performance level: DW100c
6. In the next tab, Additional settings, select none to provision the SQL pool without data. Leave the default collation as selected.
![](https://learn.microsoft.com/en-us/training/wwl-data-ai/survey-components-of-azure-synapse-analytics/media/create-sql-pool-additional-settings-screen.png)

7. We won't add any tags for now, so next select Review + create.

8. In the Review + create tab, make sure that the details look correct based on what was previously entered, and press create
![](https://learn.microsoft.com/en-us/training/wwl-data-ai/survey-components-of-azure-synapse-analytics/media/create-sql-pool-review-screen.png)
At this point, the resource provisioning flow will start. After the provisioning completes, navigating back to the workspace will show a new entry for the newly created SQL pool.

9. Once the SQL pool is created, it will be available in the workspace for loading data, processing streams, reading from the lake, etc.

![](https://learn.microsoft.com/en-us/training/wwl-data-ai/survey-components-of-azure-synapse-analytics/media/sql-pool-screen.png)

- **Azure Synapse Spark pool**
1. Launch Azure Synapse Studio. The URL can be found in the Azure Synapse Workspace created in the Azure portal.

2. In Azure Synapse Studio, navigate to the Management Hub in the left navigation by selecting the Manage icon.

3. Once in the Management Hub, navigate to the Apache Spark pools section to see the current list of Apache Spark pools that are available in the workspace.
![](https://learn.microsoft.com/en-us/training/wwl-data-ai/survey-components-of-azure-synapse-analytics/media/spark-pool-screen.png)

4. Select + New and the new Apache Spark pool create wizard will appear.

5. Enter the following details in the Basics tab:
   - Apache Spark Pool name: Sparkpool01
   - Node size: Small (4 vCPU / 32 GB)
   - Autoscale: Disabled
   - Number of Nodes: 8

![](https://learn.microsoft.com/en-us/training/wwl-data-ai/survey-components-of-azure-synapse-analytics/media/create-spark-pool-basics-screen.png)

6. In the next tab (Additional settings), leave all settings as defaults.

7. We won't add any tags for now, so select Review + create.

8. In the Review + create tab, make sure that the details look correct based on what was previously entered, and press Create.

![](https://learn.microsoft.com/en-us/training/wwl-data-ai/survey-components-of-azure-synapse-analytics/media/create-spark-pool-review-screen.png)

9. The Apache Spark pool will start the provisioning process.Once the provisioning is complete, the new Apache Spark pool will appear in the list.

![](https://learn.microsoft.com/en-us/training/wwl-data-ai/survey-components-of-azure-synapse-analytics/media/spark-pool-screen-with-pool.png)

- **Delete a pool.**
1. Navigate to the pools in the Management Hub in Synapse Studio. In this case Apache Spark

2. Select the ellipsis next to the Apache pool to be deleted (in this case, Sparkpool01) to show the commands for the Apache Spark pool.

![](https://learn.microsoft.com/en-us/training/wwl-data-ai/survey-components-of-azure-synapse-analytics/media/delete-pool.png)

3. Press delete.

4. Confirm the deletion, and press Delete button.

5. When the process completes successfully, the Apache Spark pool will no longer be listed in the workspace resources.

##### Orchestrate data integration with Azure Synapse pipelines
- Service available: Azure HDInsight, Azure Databricks และ Azure Synapse Analytics
- Most of the features come from Azure Data Factory
- enables you to integrate data pipelines between SQL Pools, Spark Pools and SQL Serverless

![alt text](/assets/DP203/Data_factory_components.png)

![alt text](/assets/DP203/Data_factory_components2.png)
- Linked Service สร้าง Connecttion กับ Service ภายนอก
- Datasets ครอบ Linked Service เพื่อให้ References ถึง Data ได้
- Activities การกระทำกับ data เช่น get copy move 
- trigger ตัวสั่งการให้เริ่มการกระทำนั้นๆ
- Pipelines = Activities + Datasets
- Parameters ภูกกันหดให้อ่านอย่างเดียว หลัวการ Setใช้เซ็ตค่าต่างๆ ที่ใช้ร่วมกัน ใน Pipelines เพื่อความยืดหยุ่นในการทำงาน
- ณntegration runtime เตรียม การประมวลผลฝั่ง infra ด้วย ADF
- Control flow use authorizing azure data factory ใช้เรรียบเรียง กิจกรรม ใน Pipeline
![](https://learn.microsoft.com/en-us/training/wwl-data-ai/survey-components-of-azure-synapse-analytics/media/data-factory-components.png)

##### Exercise-Identifying Azure Synapse pipeline components
1. Launch Azure Synapse Studio. The URL can be found in the Azure Synapse Workspace created in the Azure portal.

2. In Azure Synapse Studio, navigate to the Integrate Hub in the left navigation by selecting the Integrate icon.
![](https://learn.microsoft.com/en-us/training/wwl-data-ai/survey-components-of-azure-synapse-analytics/media/azure-synapse-studio-integrate-hub.png)

3. Expand Pipelines and select 1 Master Pipeline (1). Point out the Activities (2) that can be added to the pipeline, and show the pipeline canvas (3) on the right.

![](https://learn.microsoft.com/en-us/training/wwl-data-ai/survey-components-of-azure-synapse-analytics/media/pipelines-screen.png)

4. Our Synapse workspace contains 16 pipelines that enable us to orchestrate data movement and transformation steps over data from several sources.

5. The Activities list contains many activities that you can drag and drop onto the pipeline canvas on the right.

6. Here we see that we have three execute (child) pipelines:

![](https://learn.microsoft.com/en-us/training/wwl-data-ai/survey-components-of-azure-synapse-analytics/media/view-pipeline.png)

7. Select the Execute Customize All Pipeline activity (1). Select the Settings (2) tab. Show that the invoked pipeline is Customize All (3), then select Open (4).

![](https://learn.microsoft.com/en-us/training/wwl-data-ai/survey-components-of-azure-synapse-analytics/media/edit-settings.png)

8. As you can see, there are five child pipelines. This first execute pipeline activity cleans and ingests new Manufacturer campaign data for the Campaign Analytics report.

9. Select the Campaign Analytics activity (1), select the Settings tab (2), observe the invoked pipeline is set to Customize All (3), then select Open (4).

![](https://learn.microsoft.com/en-us/training/wwl-data-ai/survey-components-of-azure-synapse-analytics/media/edit-pipeline-settings.png)

10. Observe how cleaning and ingesting happens in the pipeline by clicking on each activity.

![](https://learn.microsoft.com/en-us/training/wwl-data-ai/survey-components-of-azure-synapse-analytics/media/parent-pipelines.png)

##### Visualize your analytics with Power BI