#### cmd창에서 pip install pymysql 먼저 설치
#### mysql에서 데이터 옮겨줄 database 만들어 놓고

```
# 연결하고싶은 db 지정하고 연결
import pymysql

host_ip = 'host_ip'
user_name = 'user_name'
password = '비밀번호'
db_name = '연결할 db이름'

conn = pymysql.connect(host=host_ip, user=user_name, port=3306, password=password, db=db_name, charset='utf8')
cur = conn.cursor()

# 예) host_ip='127.0.0.1', user_name='root', password='1234', db='testdb'
```

```
# 테이블 생성

cur.execute("CREATE TABLE usertable (columns_1 VARCHAR(50), columns_2 VARCHAR(10), columns_3 VARCHAR(10), columns_4 VARCHAR(99), columns_5 VARCHAR(50), columns_6 VARCHAR(20))")
conn.commit()
```
```
sql = """INSERT INTO usertable (columns_1, columns_2, columns_3, columns_4, columns_5, columns_6) values (%s, %s, %s, %s, %s, %s)"""

# (위 테이블 컬럼) values (들어올 데이터의 타입)
```

```

import csv

route = "csv파일이 있는 경로"
f = open(route, 'r', encoding='utf-8')
rd = csv.reader(f)
for line in rd:
    cur.execute(sql, (line[0], line[1], line[2], line[3], line[4], line[5]))
    
# rd에 일회성 있는것 같음 사용시 f, rd 코드라인 재실행 바람
# 예) line[0]이 columns_1 컬럼, line[1]이 columns_2 컬럼 
```
![mysql 삽입](https://user-images.githubusercontent.com/96936431/178644808-8ec44727-8bc8-403b-966f-865ad75739f4.png)
#### 데이터 성공적으로 들어간 모습




## ubuntu에서 실행 시킬 때

pymysql 설치
```
sudo apt install mariadb-server python3-pymysql
```

py파일 실행 시키는 명령어 예시
```
/usr/bin/python3 /home/ubuntu/test_pythonfiles/csv_insert_db_ubuntu.py

로그생성
/usr/bin/python3 /home/ubuntu/test_pythonfiles/csv_insert_db_ubuntu.py &> /home/ubuntu/test_pythonfiles/csv_insert_db_ubuntu_log
```
