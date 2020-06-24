import os
from selenium import webdriver
import time
import requests
from meishi import useragentutil
import json
import lxml.html
videos=[]
def get_video_src(href):
    chrome_path = r"F:\untitled\chromedriver.exe"
    brower = webdriver.Chrome(chrome_path)
    brower.get(href)
    time.sleep(2)
    html = brower.page_source
    time.sleep(2)
    brower.quit()
    met=lxml.html.etree
    list_l=met.HTML(html)
    href=list_l.xpath("//div[@class='play']/div[@id='youkuplayer']/iframe/@src")[0]
    return href


def get_video(url):
    response=requests.get(url,headers=useragentutil.get_headers())
    html=response.content.decode()
    met=lxml.html.etree
    list_l=met.HTML(html)
    list_a=list_l.xpath("//div[@class='wrap']/div[@class='lbox']/ul/li")
    for list_b in list_a:
        video={}
        title=list_b.xpath("./h2/a//text()")[0]
        img=list_b.xpath("./a/img/@data-original")[0]
        href=list_b.xpath("./a/@href")[0]
        video_src=get_video_src(href)
        video["title"]=title
        video["img"] = img
        video["video_src"] = video_src
        videos.append(video)
        print(videos)


def save_video(videos):
    path = "./foodfile"
    if not os.path.exists(path):
        os.mkdir(path)
    file = open(path + "/videos.json", "w", encoding="utf-8")
    json.dump(
        videos,
        file,
        ensure_ascii=False,
        indent=2
    )

def main():
    for i in range(1,36):
        url="http://www.xilibo.com/qiqusj/{}/".format(i)
        get_video(url)
    save_video(videos)



if __name__ == '__main__':
    main()