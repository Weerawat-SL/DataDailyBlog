---
layout: post
title: "Data Engineer Interview"
date: 2025-05-12
categories: [Interview, Draft]
tags: [Data Engineering]
---

# Data Engineer Interview
80% of Data Engineering Candidates Struggle with These 14 Interview Topics. Learn them and stand out.

![rwar]({{ site.baseurl }}\_posts\1745256181226.jpg) 
![online_retail_unzip]({{ site.baseurl }}/assets/Basic_ETL/online_retail_unzip.png)
1. Batch vs Streaming
Tradeoff: Batch is cost-efficient; Streaming is real-time. Pick wrong and SLAs/costs go off-track.
Interview Q: How would late-arriving events affect your daily reports?
Drill: Build a Spark batch job to S3. Rebuild it with Kafka + Flink. Compare freshness vs compute cost.

1. Columnar Formats (Parquet, ORC)
Why: Column pruning & compression = 90% less I/O.
Pitfall: Tiny files destroy performance.
Drill: Compare SQL scan over CSV vs Parquet with EXPLAIN ANALYZE.

1. Partitioning & Clustering
Why: Partitioning skips data; clustering reduces scan depth.
Pitfall: Too many partitions = thousands of tiny tasks.
Drill: Load logs partitioned by dt, then cluster by user_id. Observe task parallelism.

1. Schema Evolution
Why: Real-world data changes constantly.
Interview Q: “How do you evolve a schema without breaking consumers?”
Drill: Use Avro + Confluent Registry to evolve a schema. Test compatibility modes.

1. Change Data Capture (CDC)
Why: Keeps data fresh without full reloads.
Pitfall: Out-of-order events if binlog tracking fails.
Drill: Stream MySQL binlogs with Debezium → Kafka → PostgreSQL. Check consistency.

1. Watermarks & Late Data
Why: Event-time processing needs cutoffs.
Interview Q: How do you handle 2-hour-late events in a 1-hour window?
Drill: In Flink, simulate delayed events. Use allowedLateness. Track watermark state.

1. Idempotent Writes
Why: Retries shouldn’t duplicate records.
Drill: In Delta Lake, write with MERGE. Replay Kafka topic—verify counts remain stable.

1. Data Lineage & Metadata
Why: You can’t debug metrics if you don’t know what changed them.
Drill: Use OpenLineage or Marquez with Airflow. Track lineage for one KPI pipeline.

1. Orchestration (Airflow)
Why: Manual scripts fail silently. DAGs bring order.
Interview Q: How would you prevent accidental re-runs?
Drill: Convert scripts to Airflow DAGs. Use depends_on_past + max_active_runs.

1.  Incremental vs Full Loads
Why: Full loads waste time and money; incrementals are harder but efficient.
Drill: Redesign an S3-to-Redshift pipeline to use manifest-based incremental load.

1.  Data Skew
Why: One hot key can kill your job.
Interview Q: Why did one task take 10x longer?
Drill: Introduce skew in a Spark join. Observe stage duration. Fix with salting or repartitioning.

1.  Backpressure in Streaming
Why: Streams crash if source outruns processing.
Drill: Overwhelm a Kafka → Spark Structured Streaming job. Tune maxOffsetsPerTrigger.

1.  NoSQL (MongoDB, DynamoDB)
Why: Not all data fits in rows and columns.
Q: When would you use NoSQL over a relational DB?
Drill: Build a product catalog in MongoDB. Run flexible queries on nested fields.

1.  Data Security & Access Control
Why: Data breaches = instant failure.
Q: How do you control access to S3 or ADLS?
Drill: Configure IAM (AWS) or RBAC (Azure) to grant object-level access.