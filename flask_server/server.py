from __future__ import unicode_literals
import youtube_dl
from flask import Flask




from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    ok = False
    url = "https://audiojungle.net/item/far-west/23415981"
    extractors = youtube_dl.extractor.gen_extractors()
    for e in extractors:
        if e.suitable(url) and e.IE_NAME != 'generic':
            ok = True
    
    if ok:
      ydl = youtube_dl.YoutubeDL({'outtmpl': '%(id)s.%(ext)s'})

      with ydl:
        result = ydl.extract_info(
          url,
          download=False # We just want to extract the info
        )
        print(result['title'])
    print(ok)

    return "<p>Hello, World!</p>"




