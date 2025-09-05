import { useState } from "react"


const CalcularFrete = () => {

    // HOOK - useState- manipula o estado da variável
    const [distancia,setDistancia]=useState("");
    const [tipoTransporte, setTipoTransporte]=useState("bicicleta");
    const [valorFrete, setValorFrete]=useState(null);
    const [loading,setLoading]=useState(false);
    const [error, setError]=useState(null);

    // criando a função que vai pegar a api do servidor 
    const handleSubmit = async (e)=>{
        e.preventDefault(); //evita que pagina seja recarregada
        setLoading(true);
        setValorFrete(null);
        setError(null);

        // traamento de erro
        try{
            const response = await fetch("http://localhost:3001/calcularfrete",{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({distancia:parseFloat(distancia),tipoTransporte}),
            });

            // validando a requisição
            if (!response.ok){
                const errorDados = await response.json();
                throw new Error(errorDados.error || "Erro ao calculara o freto")
            }

            const data = await response.json();
            setValorFrete(data.valorFrete)
        }
        catch(error){
            setError(error)
        }
        finally{
            setLoading(false)
        }
    }


  return (
    <div>
        <div>
            <h1>Calcular Frete</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Distância (km)</label>
                    <input
                        type="text"
                        id="distancia"
                        min="0"
                        value={distancia}
                        onChange={(e)=>{setDistancia(e.target.value)}}
                        required
                    />
                </div>

                <div>
                    <label>Transporte</label>
                    <select 
                        id="transporte" 
                        value={tipoTransporte} 
                        onChange={(e)=>setTipoTransporte(e.target.value)}>

                        <option value="bicicleta">Bicicleta</option>
                        <option value="moto">Moto</option>
                        <option value="drone">Drone</option>

                    </select>
                </div>

                <button disabled={loading}>
                        {loading ? "Calculando..." : "Calcular"}
                </button>
            </form>

            {error && <p>{error}</p>}

            {valorFrete !== null && (

            <div>
                <h2>Valor do Frete: R$  {valorFrete}</h2>
            </div>
            )}

           
        </div>
    </div>
  )
}

export default CalcularFrete