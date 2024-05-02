import Card from '../kpis/Card.js'

function Kpis(props) {
    
    return(
        <>
            <div className="flex justify-between gap-3">
                {props.kpis.map((kpi, index) => (
                    <Card key={index} info={kpi.info} descricao={kpi.descricao}></Card>
                ))}
            </div>
          
        </>
    )
}

export default Kpis