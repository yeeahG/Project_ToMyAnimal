#!/usr/bin/env python
# coding: utf-8

# In[1]:


from selenium.webdriver.common.keys import Keys
from selenium import webdriver
import time
from selenium.webdriver.common.by import By


# In[55]:


driver = webdriver.Chrome("D:/20220103_lab/14.python/data/chrome/103/chromedriver")
driver.get("https://map.kakao.com/")
time.sleep(3)


# In[59]:


search_input_tag = driver.find_element(By.ID, 'search.keyword.query')
search_input_tag.send_keys('서울 동물병원')
time.sleep(3)


# In[60]:


search_button_tag = driver.find_element(By.ID, 'search.keyword.submit')
search_button_tag.click()
time.sleep(5)


# In[61]:


search_place_more = driver.find_element(By.ID, 'info.search.place.more')
search_place_more.click()
time.sleep(3)


# In[ ]:





# In[62]:


target = driver.find_element(By.ID, 'info.search.place')


# In[64]:


target = driver.find_element(By.XPATH, '/html/body/div[5]/div[2]/div[1]/div[7]/div[4]')


# In[ ]:


# target = driver.find_element(By.XPATH, '/html/body/div[3]/div[9]/div[9]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]')


# In[ ]:





# In[65]:


target.text


# driver.execute_script('arguments[0].scrollIntoView(true);', target)

# actions = ActionChains(driver) \
#     .move_to_element(panee) \
#     .click() \
#     .send_keys(Keys.END)
# 
# actions.perform() 

# In[54]:


target.find_elements(By.XPATH, "./ul[1]")


# In[74]:


lilist = list(range(16))


# In[76]:


lilist.remove(0)


# In[79]:


lilist.append(16)


# In[81]:


lilist.remove(4)


# In[82]:


lilist


# In[91]:


pagebutton = driver.find_element(By.XPATH, '/html/body/div[5]/div[2]/div[1]/div[7]/div[6]')


# In[95]:


pagebutton.text


# In[119]:


seoulname = []
seoulstar = []
seoulreviewtotal = []
seouladdr = []
seoultel = []


# In[117]:


page = range(5)


# In[122]:


place = "seoul"


# In[123]:


place


# In[125]:


asdf = [1,2,3,4]


# In[126]:


"{}"name.append(asdf).format(place)


# In[149]:


seoulname = [1,2,3,4]


# In[143]:


"".join('seoulname')


# In[151]:


seoulname


# In[150]:


eval("{}name".format(place))


# In[159]:


eval(place+"name").append(5)


# In[160]:


eval(place+"name")


# In[161]:


seoulname


# In[158]:


eval(place+"star")


# 서울, 대전, 대구, 부산, 인천, 울산, 광주

# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[166]:


# 서울 seoul
seoulname = []
seoulstar = []
seoulreviewtotal = []
seouladdr = []
seoultel = []


# In[ ]:


# 대전 daejeon
daejeonname = []
daejeonstar = []
daejeonreviewtotal = []
daejeonaddr = []
daejeontel = []


# In[ ]:


# 대구 daegu
daeguname = []
daegustar = []
daegureviewtotal = []
daeguaddr = []
daegutel = []


# In[ ]:


# 부산 busan
busanname = []
busanstar = []
busanreviewtotal = []
busanaddr = []
busantel = []


# In[ ]:


# 인천 incheon
incheonname = []
incheonstar = []
incheonreviewtotal = []
incheonaddr = []
incheontel = []


# In[ ]:


# 울산 ulsan
ulsanname = []
ulsanstar = []
ulsanreviewtotal = []
ulsanaddr = []
ulsantel = []


# In[ ]:


# 광주 gwangju
gwangjuname = []
gwangjustar = []
gwangjureviewtotal = []
gwangjuaddr = []
gwangjutel = []


# In[168]:


# 키워드 입력, 검색버튼 클릭, 장소 더보기 클릭
search_input_tag = driver.find_element(By.ID, 'search.keyword.query')
search_input_tag.send_keys('서울 동물병원')
time.sleep(1)
search_button_tag = driver.find_element(By.ID, 'search.keyword.submit')
search_button_tag.click()
time.sleep(2)
search_place_more = driver.find_element(By.ID, 'info.search.place.more')
search_place_more.click()
time.sleep(3)


# In[170]:


# place 바꿔서 코드 재활용

place = "seoul"

page = range(30)
for divtag in target.find_elements(By.XPATH, "./ul[1]"):
    if divtag.text != "":
        for k in page:
            for j in range(10):
                pagebuttonl = pagebutton.find_element(By.XPATH, './a[{}]'.format(j+1))
                pagebuttonl.click()
                time.sleep(3)
                for i in lilist:
                    #print("--------------------------")
                    #print(i)
                    subdiv = divtag.find_element(By.XPATH, "./li[{}]".format(i))
                    name = subdiv.find_element(By.XPATH, "./div[3]/strong/a[2]")
                    star = subdiv.find_element(By.XPATH, "./div[4]/span[1]/em")
                    reviewtotal = subdiv.find_element(By.XPATH, "./div[4]/span[1]/a")
                    addr = subdiv.find_element(By.XPATH, "./div[5]/div[2]")
                    tel = subdiv.find_element(By.XPATH, "./div[5]/div[4]/span[1]")
                    #print(name.text, "= name")
                    #print(star.text, "= star")
                    #print(reviewtotal.text, "= reviewtotal")
                    #print(addr.text, "= addr")
                    #print(tel.text, "= tel")
                    eval(place+"name").append(name.text)
                    eval(place+"star").append(star.text)
                    eval(place+"reviewtotal").append(reviewtotal.text)
                    eval(place+"addr").append(addr.text)
                    eval(place+"tel").append(tel.text)            
                if j == 4 :
                    pagebuttonnext = pagebutton.find_element(By.XPATH, './button[2]')
                    pagebuttonnext.click()
                    time.sleep(3)


# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:




