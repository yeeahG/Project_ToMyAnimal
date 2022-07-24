import pymysql
import csv
import os

host = 'host_ip'
user = 'user_name'
password = 'password'
db = 'testdb'

conn = pymysql.connect(host=host, user=user, port=3306, password=password, db=db, charset='utf8')

cur = conn.cursor()

sql = """INSERT INTO location (columns_1, columns_2, columns_3, columns_4, columns_5, columns_6) values (%s, %s, %s, %s, %s, %s) on duplicate key update addr = values(columns_4)"""

csvfile_route = "/csv파일이 있는 경로"

for crawling_csvfile in os.listdir(csvfile_route):
    f = open(csvfile_route + "/" + crawling_csvfile, 'r', encoding='utf-8')
    rd = csv.reader(f)
    for line in rd:
        cur.execute(sql, (line[0], line[1], line[2], line[3], line[4], line[5]))

conn.commit()

conn.close()
f.close()

