FROM python:3.9

COPY requirements.txt .

RUN pip install -r requirements.txt
# run pip... in the terminal (download everything in the .txt file)

COPY app/ .
# copies new files or directories from (app/)
# and adds them to the filesystem of the container at the path  (.)

CMD python src/ISTM/server.py
#starts a process, when it ends it gets destroid. in this case it never ends