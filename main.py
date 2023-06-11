import io
import numpy as np
from fastapi import FastAPI, File, UploadFile
from PIL import Image
import tensorflow as tf
import collections
from tensorflow.keras.preprocessing import image
from pydantic import BaseModel
import requests


def create_dict():
    code_dict = collections.defaultdict(list)
    for key, value in [
        (0, "AP115"),
        (1, "AP116"),
        (2, "AP117"),
        (3, "AP118"),
        (4, "AP119"),
        (5, "AP120"),
        (6, "BP077"),
        (7, "CP062"),
        (8, "CP083"),
        (9, "DP030"),
        (10, "DP031"),
        (11, "EP016"),
        (12, "FP036"),
        (13, "FP062"),
        (14, "FP089"),
        (15, "FP090"),
        (16, "FP091"),
        (17, "FP092"),
        (18, "FP093"),
        (19, "GP083"),
    ]:
        code_dict[key].append(value)
    return code_dict


model = tf.keras.models.load_model("model_dense.h5")
labels = create_dict()


def output(location):
    img = image.load_img(location, target_size=(224, 224, 3))
    img = image.img_to_array(img)
    img = img / 255
    img = np.expand_dims(img, [0])
    answer = model.predict(img)
    y_class = answer.argmax(axis=-1)
    y = " ".join(str(x) for x in y_class)
    y = int(y)
    res = labels[y]
    return res


app = FastAPI()


class UrlImage(BaseModel):
    url: str


@app.post("/")
async def upload(urlImage: UrlImage):
    downloadImage = requests.get(urlImage.url)
    imageContent = io.BytesIO(downloadImage.content)
    result = output(imageContent)

    return {"results": result}
