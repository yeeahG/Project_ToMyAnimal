from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import pandas as pd
import pymysql
import csv
import os

ko_to_en = {"서울":"seoul", "대전":"daejeon", "대구":"daegu", "부산":"busan", "광주":"gwangju", "울산":"ulsan", "인천":"incheon", "동물병원":"animal_hospital", "반려동물훈련소":"pet_training_center"}

# 예시)
# - crawling_animal("울산", "동물병원")
# - crawling_animal("서울", "반려동물훈련소")

def crawling_animal_hospital_or_center(place, search):
    
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_argument('lang=ko')
    chrome_options.add_argument('User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.151 Whale/3.14.134.62 Safari/537.36')
    
    path="/usr/bin/chromedriver"
    driver = webdriver.Chrome(path, chrome_options=chrome_options)
    url="https://map.kakao.com/"
    driver.get(url)
    time.sleep(3)
    
    dimmed_layer_click = driver.find_element(By.CSS_SELECTOR, "div#dimmedLayer.DimmedLayer").click()
    time.sleep(1)
    search_input_tag_send_keys = driver.find_element(By.ID, 'search.keyword.query').send_keys('{} {}'.format(place, search))
    time.sleep(1)
    search_button_tag_click = driver.find_element(By.ID, 'search.keyword.submit').click()
    time.sleep(1)
 
    def crawling_to_csv():
        
        name_list = []
        star_list = []
        review_total_list = []
        addr_list = []
        tel_list = []
        target_searchplace = driver.find_element(By.ID, 'info.search.place')
        
        try:
            for ul_tag in target_searchplace.find_elements(By.XPATH, "./ul[1]"):
                if ul_tag.text == "":
                    print("empty")
                else:
                    for page_1to5 in range(50):
                        for button_range in range(2,7):
                            print(len(ul_tag.text.split("즐겨찾기")))
                            for card_of_page in list(range(1,17)):
                                subli = ul_tag.find_element(By.XPATH, "./li[{}]".format(card_of_page))
                                try :
                                    name = subli.find_element(By.XPATH, "./div[3]/strong/a[2]")
                                    star = subli.find_element(By.XPATH, "./div[4]/span[1]/em")
                                    review_total = subli.find_element(By.XPATH, "./div[4]/span[1]/a")
                                    addr = subli.find_element(By.XPATH, "./div[5]/div[2]")
                                    tel = subli.find_element(By.XPATH, "./div[5]/div[4]/span[1]")

                                    name_list.append(name.text)
                                    star_list.append(star.text)
                                    review_total_list.append(review_total.text)
                                    addr_list.append(addr.text)
                                    tel_list.append(tel.text)
                                except:
                                    print("광고 필터링")

                            if button_range == 6 :
                                pagebutton_next = pagebutton.find_element(By.XPATH, "./div[1]/button[2]")
                                pagebutton_next.click()
                                continue
                                time.sleep(1)
                                
                            pagebutton.find_element(By.XPATH, "./div[1]/a[{}]".format(button_range)).click()
                            time.sleep(1)

        except:
            crawling_df = pd.DataFrame({ '이름':name_list, '별점':star_list, '리뷰수':review_total_list, '주소':addr_list, '전화':tel_list })
            crawling_df['주소'] = crawling_df['주소'].apply(lambda x: x.replace("\n", ", "))
            crawling_df_dropdupl = crawling_df.copy()
            crawling_df_dropdupl.drop_duplicates(['이름', '주소'], keep = 'first')
            crawling_df_dropdupl['location_type'] = 0 if search == "동물병원" else 1
            crawling_df_dropdupl.to_csv('/home/ubuntu/test_pythonfiles/csvlist2/'+ko_to_en[search]+'_'+ko_to_en[place]+'.csv', index=False, header=False)
            print(place+" "+search+" 크롤링 완료")
            
    try:
        search_place_more = driver.find_element(By.ID, 'info.search.place.more').click()
        time.sleep(1)
        pagebutton = driver.find_element(By.XPATH, '/html/body/div[5]/div[2]/div[1]/div[7]/div[6]')
        pagebutton.find_element(By.XPATH, "./div[1]/a[1]").click()
        time.sleep(1)
    except:
        print("더보기, 페이지버튼 없음")
    finally:
        crawling_to_csv()

place_list = ["서울", "대전", "대구", "부산", "광주", "울산", "인천"]
search_list = ["동물병원", "반려동물훈련소"]

[crawling_animal_hospital_or_center(area, search_word) for search_word in search_list for area in place_list]

conn = pymysql.connect(host='database-1.cjsvopo9rkyv.ap-northeast-2.rds.amazonaws.com', user='juneseok', port=3306, password='gkswk123', db='team1', charset='utf8')

cur = conn.cursor()

sql = """INSERT INTO location (hospital_name, star, review_count, addr, tel, location_type) values (%s, %s, %s, %s, %s, %s) on duplicate key update addr = values(addr)"""

csvfile_route = "/home/ubuntu/test_pythonfiles/csvlist2"

for crawling_csvfile in os.listdir(csvfile_route):
    f = open(csvfile_route + "/" + crawling_csvfile, 'r', encoding='utf-8')
    rd = csv.reader(f)
    for line in rd:
        cur.execute(sql, (line[0], line[1], line[2], line[3], line[4], line[5]))

conn.commit()

conn.close()
f.close()
