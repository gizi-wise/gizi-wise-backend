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
        (0, "BR013"),
        (1, "BR030"),
        (2, "CR008"),
        (3, "CR018"),
        (4, "DR007"),
        (5, "DR008"),
        (6, "DR010"),
        (7, "DR042"),
        (8, "DR044"),
        (9, "DR085"),
        (10, "DR109"),
        (11, "DR126"),
        (12, "DR145"),
        (13, "DR154"),
        (14, "DR161"),
        (15, "DR166"),
        (16, "ER002"),
        (17, "ER004"),
        (18, "ER039"),
        (19, "ER052"),
        (20, "ER054"),
        (21, "ER070"),
        (22, "ER074"),
        (23, "ER105"),
        (24, "NR008"),
        (25, "NR015"),
        (26, "NR018"),
    ]:
        code_dict[key].append(value)
    return code_dict


model = tf.keras.models.load_model("model.h5")
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
    downloadImage = requests.get("https://storage.googleapis.com/gizi-wise/images/products/1686255010992-pisang.png")
    imageContent = io.BytesIO(downloadImage.content)
    result = output(imageContent)

    return {"results": result}
