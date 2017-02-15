import sqlite3, configparser, os, json, time, xlsxwriter, sys, logging, random
from structs import schemeXls

profileID = sys.argv[1]
pitStatis = {'status': 0, 'file': None}

def getPath(directory):
    """
        Get current path
    """
    return os.path.abspath(os.path.join(os.path.dirname( __file__ ), '..', directory))

def dictFactory(cursor, row):
    """
        Parse method cursor to dic
    """
    dictList = {}
    for idx, col in enumerate(cursor.description):
        dictList[col[0]] = row[idx]
    return dictList

def setUpStatus(status):
    """
        Set current script status
        Args:
            string status
    """
    pidPath = getPath('backend')
    with open('{}/{}'.format(pidPath, 'status.pid'), 'w') as resurce:
        pitStatis['status'] = status
        resurce.write(str(json.dumps(pitStatis)))

    

path = "{}/log.txt".format(getPath('logs'))
logging.basicConfig(filename=path, level=logging.DEBUG)


logging.info("Profile real ID: {}".format(profileID))
config = configparser.ConfigParser()
configPath   = getPath('backend')
databasePath = getPath('database')
config.read('{}/{}'.format(configPath, 'config.ini'))
db = sqlite3.connect('{}/{}'.format(databasePath, config['database']['name']))

sql = "SELECT `body` FROM `profiles` WHERE `id` = ?"

cursor = db.cursor()
cursor.row_factory = dictFactory
param = (profileID,)
cursor.execute(sql, param)
profile = cursor.fetchone()

profile = json.loads(profile['body'])
logging.debug(profile)

reportPath = "{}/{}.xlsx".format(getPath('downloads'), profile['name'])

if os.path.isfile(reportPath):
    logging.info("file {} was exists".format(reportPath))
    pidStatus['file'] = reportPath
    setUpStatus(0)
    sys.exit()

sql = "SELECT * FROM `reports` WHERE `profile_id` = ?"

cursor = db.cursor()
cursor.row_factory = dictFactory
param = (profileID,)
cursor.execute(sql, param)
data = cursor.fetchall()
reportData = sorted(data, key=lambda value: value['total_cost'], reverse=True)
minCost = config['main']['minimal']
itertion = 0
result = list()
for xPark in profile['data']:
    logging.info("Search sum for {}".format(xPark['name']))
    setUpStatus(1)
    way = [0 for _ in range(int(xPark['sum']) + 1)]
    resultList = way.copy()
    way[0] = 1
    for key, _ in enumerate(range(len(reportData))):
        i = int(xPark['sum'])
        while i > 0:
            if way[i] == 0 and i >= int(reportData[key]['total_cost']) and way[i - int(reportData[key]['total_cost'])] != 0:
                way[i] = reportData[key]['total_cost']
                resultList[i] = reportData[key]
            i -= 1
            time.sleep(0.000001)
    
    if way[int(xPark['sum'])] == 0:
        setUpStatus(-1)
        logging.info("Not found sum for {}".format(xPark['name']))
        sys.exit()
    else:
        i = int(xPark['sum'])
        while i != 0:
            time.sleep(0.000001)
            logging.debug("Way: {}".format(way[i]))
            resultList[i]['taxi_park_name'] = xPark['name']
            reportData[:] = [report for report in reportData if int(report.get('order_id')) != int(resultList[i]['order_id'])]
            result.append(resultList[i])
            i -= way[i]

result = result + reportData
random.shuffle(result)
toXls = list()
toXls.append(schemeXls)
tempList = list()
for temp in result:
    tempList.append(temp['date'])
    tempList.append(temp['order_id'])
    tempList.append(temp['client_name'])
    tempList.append(temp['company_name'])
    tempList.append(temp['taxi_park_name'])
    tempList.append(temp['tariff'])
    tempList.append('Корп')
    tempList.append(temp['total_cost'])
    toXls.append(tempList.copy())
    tempList.clear()

workbook = xlsxwriter.Workbook(reportPath)
worksheet = workbook.add_worksheet()

row = 0
col = 0
for newRoute in toXls:
    for data in newRoute:
        worksheet.write(row, col, data)
        col += 1
    row += 1
    col = 0
logging.info("Done")
pitStatis['file'] = reportPath
setUpStatus(0)
workbook.close()