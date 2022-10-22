import {ethers} from "./ethers-5.6.esm.min.js";
import {abi, contractaddress, deployer} from "./constants.js"

const connectbtn = document.getElementById("connectbtn");
connectbtn.onclick = connect;

const fundButton = document.getElementById("text");

//For admin:

const balancebox = document.getElementById("balancebox");

const getbal = document.getElementById("getbal");
getbal.onclick = getbal1;

const alphas1 = document.getElementById("alphas");
const betas1 = document.getElementById("betas");
const gammas1 = document.getElementById("gammas");

const refresher = document.getElementById("refresher");
refresher.onclick = refresh;

const withdraw = document.getElementById("withdraw");
withdraw.onclick = withdrawing;

const checkbtn = document.getElementById("check");
checkbtn.onclick = check;

// for funders: 

let currentlevel;

const l1 = document.getElementById("l1");
l1.onclick = fund1;

const l2 = document.getElementById("l2");
l2.onclick = fund2;

const l3 = document.getElementById("l3");
l3.onclick = fund3;

//Functions:

async function connect(){
    if(typeof window.ethereum!== 'undefined'){
        console.log(" present ");
        await window.ethereum.request({method:"eth_requestAccounts"})
        document.getElementById("connectbtn").innerHTML = "connected"
        document.getElementById("connectbtn").style.paddingLeft = '50px'

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractaddress, abi, signer)
      const currentuser = await signer.getAddress();
        if(currentuser == deployer){
          document.getElementById("adminpage").style.display = "block";
          document.getElementById("funderpage").style.display = "none";
          refresh();

        }else{
          document.getElementById("adminpage").style.display = "none";
          document.getElementById("funderpage").style.display = "block";
          currentlevel = await contract.getlevel(currentuser);
          currentlevel = Number(currentlevel);
          console.log(currentlevel);
          render();
        }
    }else{
        document.getElementById("text").innerText = "Please get metamask"
    }  
}

async function getbal1(){
  if (typeof window.ethereum !== "undefined") {
    console.log("pehla");
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    // const contract = new ethers.Contract(contractaddress, abi, signer)

    try {
      const bal = await provider.getBalance(contractaddress)
      balancebox.innerHTML = ethers.utils.formatEther(bal)      
    } catch (error) {
      console.log(error)
    }
  } else {
    fundButton.innerHTML = "Please install MetaMask"
  }
}

async function refresh() {

  if (typeof window.ethereum !== "undefined") {
    console.log("pehla");
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractaddress, abi, signer)

    let alphas = await contract.getalpha();
    let betas = await contract.getbeta();
    let gammas = await contract.getgamma();
  
    alphas1.innerHTML = alphas;
    betas1.innerHTML = betas;
    gammas1.innerHTML = gammas;

  }else{
      document.getElementById("text").innerText = "Please get metamask"
  }
}

async function withdrawing() {
  // const ethAmount = document.getElementById("ethAmount").value
  // const ethAmount = document.getElementById("inputter").value;
  // console.log(`Funding with ${ethAmount}...`)
  if (typeof window.ethereum !== "undefined") {
    // console.log("pehla");
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractaddress, abi, signer)
    try {
      const transactionResponse = await contract.withdraw()
      // console.log("pehla");
      await listenForTransactionMine(transactionResponse, provider);
      
    } catch (error) {
      console.log(error)
    }
  } else {
    fundButton.innerHTML = "Please install MetaMask"
  }
}

async function check(){
  if (typeof window.ethereum !== "undefined") {
    console.log("pehla");
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractaddress, abi, signer)
    let address = document.getElementById("mapper").value;
    let leveladd = await contract.getlevel(address);
    document.getElementById("output").innerHTML = ` > > > > > Level: ${leveladd}`;
    document.getElementById("mapper").value = "";
  }else{
      document.getElementById("text").innerText = "Please get metamask"
  }   
}

function listenForTransactionMine(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash}`)
  return new Promise((resolve, reject) => {
      try {
          provider.once(transactionResponse.hash, (transactionReceipt) => {
              console.log(
                  `Completed with ${transactionReceipt.confirmations} confirmations. `
              )
              resolve()
          })
      } catch (error) {
          reject(error)
      }
  })
}

function render(){
  document.getElementById("mylevel").innerHTML = currentlevel;

  if(currentlevel==1){
    l1.disabled = true;
    l2.disabled = false;
    l3.disabled = false;
    document.getElementById("premiumcontent").innerHTML = `<div style="display: flex; justify-content: center; ">
       
    <img src="imgs/${currentlevel}.png" class="pre" />
    <img src="imgs/${currentlevel}.png" class="pre" />
    <img src="imgs/${currentlevel}.png" class="pre" />
    
</div>`;
  }else if(currentlevel == 0){
    l1.disabled = false;
    l2.disabled = false;
    l3.disabled = false;
    document.getElementById("premiumcontent").innerHTML = `Please subscribe for premium content`;
  }else if(currentlevel == 2 ){
    l1.disabled = true;
    l2.disabled = true;
    l3.disabled = false;
    document.getElementById("premiumcontent").innerHTML = `<div style="display: flex; justify-content: center; ">
       
    <img src="imgs/${currentlevel}.png" class="pre" />
    <img src="imgs/${currentlevel}.png" class="pre" />
    <img src="imgs/${currentlevel}.png" class="pre" />
    
</div>`;
  }else if (currentlevel == 3){
    l1.disabled = true;
    l2.disabled = true;
    l3.disabled = true;
    document.getElementById("premiumcontent").innerHTML = `<div style="display: flex; justify-content: center; ">
       
    <img src="imgs/${currentlevel}.png" class="pre" />
    <img src="imgs/${currentlevel}.png" class="pre" />
    <img src="imgs/${currentlevel}.png" class="pre" />
    
</div>`;
  }
}

async function fund1() {
  const ethAmount = "0.0001";
  console.log(`Funding with ${ethAmount}...`)
  if (typeof window.ethereum !== "undefined") {
    console.log("pehla");
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractaddress, abi, signer)
    try {
      const transactionResponse = await contract.fund(0,1,{
        value: ethers.utils.parseEther(ethAmount),
      })
      console.log("pehla");
      await listenForTransactionMine(transactionResponse, provider);
      currentlevel = 1;
      render();       
    } catch (error) {
      console.log(error)
    }
  } else {
    fundButton.innerHTML = "Please install MetaMask"
  }
}

async function fund2() {
  console.log(currentlevel);
  let ethAmount;
  const level = 2;
  if(currentlevel==0){
    ethAmount = "0.001";
  }else{
    ethAmount = "0.0009";
  }
  console.log(ethAmount);
  if (typeof window.ethereum !== "undefined") {
    console.log("pehla");
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractaddress, abi, signer)
    try {
      const transactionResponse = await contract.fund(currentlevel,2,{
        value: ethers.utils.parseEther(ethAmount),
      })
      console.log("pehla2");
      await listenForTransactionMine(transactionResponse, provider);
      currentlevel = 2;
      render();
      
    } catch (error) {
      console.log(error)
    }
  } else {
    fundButton.innerHTML = "Please install MetaMask"
  }
}

async function fund3() {
  console.log(currentlevel);
  let ethAmount;
  if(currentlevel==0){
    ethAmount = "0.01";
  }else if(currentlevel == 1){
    ethAmount = "0.0099";
  }else{
    ethAmount = "0.00009";
  }
  console.log(ethAmount);
  if (typeof window.ethereum !== "undefined") {
    console.log("pehla");
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractaddress, abi, signer)
    try {
      const transactionResponse = await contract.fund(currentlevel,3,{value: ethers.utils.parseEther(ethAmount)})
      console.log("pehla");
      await listenForTransactionMine(transactionResponse, provider);
      currentlevel = 3;
      render();
    } catch (error) {
      console.log(error)
    }
  } else {
    fundButton.innerHTML = "Please install MetaMask"
  }
}

