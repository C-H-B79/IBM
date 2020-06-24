import requests
from meishi import useragentutil
import lxml.html
import json
import os

def read_food_video(href):
    video={}
    """获取视频"""
    food_video_response = requests.get(href, headers=useragentutil.get_headers())
    html_content = food_video_response.content.decode("utf-8")
    """提取美食信息"""
    metree = lxml.html.etree
    food_info_video_parser = metree.HTML(html_content)
    li_list_video = food_info_video_parser.xpath("//div[@class='v_c1']/div[@class='vw']/video/@src")[0]
    li_list_video_text_title = food_info_video_parser.xpath("//div[@class='v_c3']/strong//text()")[0]
    li_list_video_text = food_info_video_parser.xpath("//div[@class='v_c3']/p//text()")
    #print(li_list_video)
    #print(li_list_video_text_title)
    #print(li_list_video_text)
    video["li_list_video"]=li_list_video
    video["li_list_video_text_title"] = li_list_video_text_title
    video["li_list_video_text"] = li_list_video_text
    return video

def parse_food_url(http_url):
    """获取整个网页数据"""
    food_response = requests.get(http_url,headers=useragentutil.get_headers())
    html_content = food_response.content.decode("utf-8")
    """提取美食信息"""
    metree = lxml.html.etree
    food_info_parser = metree.HTML(html_content)
    list_c=food_info_parser.xpath("//div[@class='v_list']/div[@class='v_item']")
    infos=[]
    for list_b in list_c:
        info={}
        li_list_href = list_b.xpath("./a/@href")[0]
        # 遍历链接视频的地址，前往下载视频
        video=read_food_video(li_list_href)
        li_list_pictures = list_b.xpath("./a/div[@class='c1']/img/@src")[0]
        li_list_name = list_b.xpath("./a/div[@class='c2']/strong//text()")[0]
        info['li_list_name']=li_list_name
        info['li_list_pictures'] = li_list_pictures
        info['video_a'] = video
        infos.append(info)
    return infos

def save_food_file(datas):
    """以json保存文件,美食的数据信息"""
    # 不存在保存路劲则创建该路径
    food_name = "./foodfile"
    if not os.path.exists(food_name):
        os.makedirs(food_name)
        print("目录[%s]保存美食信息已创建成功！" % food_name)
    # 保存数据
    food_file = open(food_name + "/food.json", "w", encoding="utf-8")
    json.dump(datas,
              food_file,
              ensure_ascii=False,
              indent=2)
    print("美食信息已保存成功！")

def main():
    """获取网页的数据"""
    food_list = []
    for i in range(1,74):
        food_url = "https://www.meishij.net/video/?page={}".format(i)
        food_info_datas = parse_food_url(food_url)
        print(food_info_datas)
        food_list.append(food_info_datas)
    #保存信息
    save_food_file(food_list)

if __name__=='__main__':
    main()