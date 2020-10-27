const express = require('express')
const app = express()
const os = require('os')
const path = require('path').resolve()
const { renderFile: render } = require('ejs')

app.use('/src', express.static(path + '/src'))
app.get('/', async (_, res) => {
    let cpuName = os.cpus()
    const str = await render(path + '/views/index.ejs', { 
        hostname: os.hostname(), 
        type: os.type(), 
        platform: os.platform(),
        cpu: cpuName[1].model, 
        rem: os.totalmem()/1024,
        uptime: os.uptime()/60
    })
    res.send(str)
    // console.log(cpuName[1])
})

app.listen(8080, () => console.log('Server on : http://localhost:8080/'))
