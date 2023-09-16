const amount = document.querySelector("#txtamount");
const cboCash = document.querySelector("#cbomonedas");
const lblResult = document.querySelector("#lblresult");
const btnSearch = document.querySelector("#btnsearch");
const lblerror = document.querySelector("#lblerror");

const apiUrl = "https://mindicador.cl/api/";

btnSearch.addEventListener("click", async (e) => {
  try {
    e.preventDefault();
    if (cboCash.value === "") return;

    const response = await fetch(apiUrl);
    const dataCbo = await response.json();

    lblResult.innerHTML = `Resultado $ ${
      Number(amount.value) * Number(dataCbo[cboCash.value].valor)
    }`;
    
    renderizarGrafica(cboCash.value);
  } catch (error) {
    console.log(error);
    lblerror.innerHTML = `Algo salió mal! Error: ${e.message}`;
  }
});

async function renderizarGrafica(value) {
  const response = await fetch(apiUrl + value);
  const dataGraph = await response.json();

  const labels = dataGraph.serie.map((item) => item.fecha);
  const values = dataGraph.serie.map((item) => item.valor);


  const datasets = [
    {
      label: `Estadísticas Indicador ${value} `,
      borderColor: "rgb(255, 99, 132)",
      data : values.slice(0,10),
    },
  ];


const config = {
  type: "line",
  data: {
    labels: labels.slice(0, 10),
    datasets: [
      {
        label: `Estadísticas Indicador ${value}`,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        data: values.slice(0, 10),
      },
    ],
  },
  options: {
    scales: {
      x: {
        title: {
          display: true,
          text: "Fechas",
        },
      },
      y: {
        title: {
          display: true,
          text: "Valores",
        }
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top", 
      },
    },
    tooltips: {
      mode: "index",
      intersect: false,
    },
  },
};
 
  let myChart = document.getElementById("myChart");

  myChart.style.backgroundColor = "white";

  if (myChart && myChart.chart) {
    myChart.chart.destroy();
  }

  myChart.chart = new Chart(myChart, config);
   

} 







