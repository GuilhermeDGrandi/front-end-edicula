

export function getDatasEntre(startDate, endDate){
    const datas = []
    const dataAtual = new Date(startDate)

    while(dataAtual <= endDate){
        datas.push(new Date(dataAtual))
        dataAtual.setDate(dataAtual.getDate() +1)
    }
    
    return datas
}

export function calculateTotalValue(datas){
    console.log(datas)
    let total = 0

    const diasSemana = datas.map(dataStr =>{
        const data = new Date(dataStr)
        return data.getDay()
    })
    console.log(diasSemana)

    const temSabado = diasSemana.includes(5)
    const temDomingo = diasSemana.includes(6)
    const temSexta = diasSemana.includes(4)
    const apenasSabado = diasSemana.length === 1 && temSabado
    const apenasDomingo = diasSemana.length === 1 && temDomingo

    if((temSabado && temDomingo && temSexta && diasSemana.length===3)||(temSabado && temDomingo && diasSemana.length===2)){
        total = 1200
        if(temSexta) total = 1500
    } else if(apenasSabado||apenasDomingo){
        total = 700
    } else if(temSexta && temSabado && temDomingo && diasSemana.length>3){
        total = 1500+ (diasSemana.length-3)*400
    }else if(temSexta && temSabado && diasSemana.length>2){
        total = 1000+ (diasSemana.length-2)*400
    }else if(temSexta && temSabado){
        total = 1200
    }else {
        total = diasSemana.length*400
    }

    return total
}
