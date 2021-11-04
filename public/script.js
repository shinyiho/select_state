const resultP = document.getElementById("results")
const input = document.getElementById("country")

const fetchState  = (e) => {
    console.log('change', e.target.value)
    gqFetchStates(e.target.value)
    // fetch(`/states?q=${e.target.value}`, {
    //     method: "GET",
    //     headers: { "Content-Type": "application/json" },
    //   })
    //     .then((res) => res.json())
    //     .then((response) => {
    //       console.log(JSON.stringify(response));
    //     });
  
}
input.addEventListener("input", fetchState);

function gqFetchStates(input) {
  fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: `query GetStates($input: String) {
        states(query: $input)
      }`,
      variables: { input },
    })
  })
    .then(r => r.json())
    .then(data => { 
      console.log('data returned:', data)
      resultP.textContent = data.data.states.toString()
    });
}