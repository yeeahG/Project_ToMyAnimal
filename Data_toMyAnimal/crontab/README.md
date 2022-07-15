## 1. 크롬 설치
공식 Google 저장소를 추가하는 대신 rpm 파일을 다운로드하여서 설치할 것이다. 어차피 설치 과정에서 저장소가 추가되기 때문이다. 아래와 같이 wget 명령으로 최신 크롬 패키지를 다운로드하고, yum localinstall을 이용해 설치를 진행한다.
```
wget https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm
sudo yum localinstall google-chrome-stable_current_x86_64.rpm
```
설치도중 y입력해 설치 진행
<br>

### 설치확인
```
google-chrome --version
```
Google Chrome 103.0.5060.114 라고 나왔습니다. -> 103버전
<br>

### 추가된 저장소 확인
설치 과정에서 정말로 Google Chrome 공식 저장소가 추가되었는지 확인해본다.<br>
```
ll /etc/yum.repos.d/
```

## 2. 크롬 드라이버 설치

최근(103버전) linux chromedriver 다운로드
```
wget -N https://chromedriver.storage.googleapis.com/103.0.5060.53/chromedriver_linux64.zip
```
압축해제
```
unzip chromedriver_linux64.zip
```
드라이버 위치 이동
```
sudo mv chromedriver /usr/bin/chromedriver
```
(드라이버 위치는 크롤링 코드에서 path와 맞추면됨. )

## 3. Selenium 및 기타 라이브러리 설치
```
pip3 install selenium
pip3 install pandas
```


## 4. 실행
예시코드)
```
/usr/bin/python3 /home/ec2-user/test_pythonfiles/ptc_test.py
```
- 파이썬위치 /py파일위치 쓰면 실행됩니다.

crontab -e 를 치면 해당 창에서 i로 insert모드로 변경<br>
예시코드)
```
0 */1 * * * /usr/bin/python3 /home/ec2-user/test_pythonfiles/ah_test10.py &>/home/ec2-user/test_pythonfiles/ah_test10_log
```
쓰고 ESC : wq 로 저장<br>
/usr 앞에는 분, 시간, 일, 월, 요일을 나타내며 * * * * * 일 경우 매 분마다 실행됩니다.<br>
해당코드는 ah_test10.py를 매일 정각마다 실행하고 &>뒤 경로에 log가 저장됩니다.<br>
해당 코드로 로그는 덮어쓰기 되지만 덮어쓰기 하지않는 코드도 존재합니다.<br>
ah_test10.py 뒤의 코드를 지우면 로그는 생성되지 않습니다.<br>



## 5. crontab 사용법

crontab -e -> crontab 편집 <br>
crontab -l -> crontab list 조회 <br>
crontab -r -> crontab list 전체 삭제 <br>
<br>

40 6 * * 1 	=> 매주 월요일 오전 6시 40분에 실행 <br>
40 6 * * 1-5 	=> 매주 월~금요일 오전 6시 40분 실행 <br>
10-40 6 * * * 	=> 매일 오전 6시 10분부터 40분까지 매분 실행 <br>
*/20 * * * *	=> 매일 20분마다 실행 <br>
0 */5 * * * 	=> 매일 5시간마다 실행 <br>

