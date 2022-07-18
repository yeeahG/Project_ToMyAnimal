import pymysql
import csv
import os

conn = pymysql.connect(host='database-1.cjsvopo9rkyv.ap-northeast-2.rds.amazonaws.com', user='juneseok', port=3306, password='gkswk123', db='team1', charset='utf8')

cur = conn.cursor()

sql = """INSERT INTO location (hospital_name, star, review_count, addr, tel, location_type) values (%s, %s, %s, %s, %s, %s) on duplicate key update addr = values(addr)"""

csvfile_route = "/home/ubuntu/test_pythonfiles/csvlist"

for crawling_csvfile in os.listdir(csvfile_route):
    f = open(csvfile_route + "/" + crawling_csvfile, 'r', encoding='utf-8')
    rd = csv.reader(f)
    for line in rd:
        cur.execute(sql, (line[0], line[1], line[2], line[3], line[4], line[5]))

conn.commit()

conn.close()
f.close()
