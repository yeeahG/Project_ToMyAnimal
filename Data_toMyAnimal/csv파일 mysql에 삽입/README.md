#### cmd창에서 pip install pymysql 먼저 설치
#### mysql에서 데이터 옮겨줄 database 만들어 놓고

```
# 연결하고싶은 db 지정하고 연결
import pymysql
conn = pymysql.connect(host='127.0.0.1', user='root', port=3306, password='비밀번호', db='연결할db이름', charset='utf8')
cur = conn.cursor()

# 예) password='1234', db='testdb'
```

```
# 테이블 생성
# 본 코드에서는 컬럼을 6개 사용했음

cur.execute("CREATE TABLE usertable (hospital_name VARCHAR(50), star VARCHAR(10), review_count VARCHAR(10), addr VARCHAR(99), tel VARCHAR(50), location_type VARCHAR(20))")
conn.commit()
```
```
sql = """INSERT INTO usertable (hospital_name, star, review_count, addr, tel, location_type) values (%s, %s, %s, %s, %s, %s)"""

# (위 테이블 컬럼) values (들어올 데이터의 타입)
```

```

import csv
f = open("D:/20220103_lab/14.python/finalproject/동물병원csv + 인덱스삭제/animalhospital_서울.csv", 'r', encoding='utf-8')
rd = csv.reader(f)
for line in rd:
    cur.execute(sql, (line[0], line[1], line[2], line[3], line[4], line[5]))
    
# f = open("csv파일 경로")
# rd에 일회성 있는것 같음 사용시 f, rd 코드라인 재실행 바람
# 예) line[0]이 hospital_name컬럼, line[1]이 star컬럼 
```
![mysql 삽입](https://user-images.githubusercontent.com/96936431/178644808-8ec44727-8bc8-403b-966f-865ad75739f4.png)
#### 데이터 성공적으로 들어간 모습
