let globleData = []; 

counttheproducts()
function counttheproducts(){
let url = "https://server-com-wzh0.onrender.com/products"
fetch("https://server-com-wzh0.onrender.com/products")
.then((res)=>{
    return res.json()
})
.then((data)=>{
    console.log(data)
    globleData=data
   filterForTable(data);
})

}
function filterForTable(data){
    let obj ={}
  for(let i=0;i<data.length;i++){
    if(!obj[data[i].category]){
        obj[data[i].category] = 1
    }else{
        obj[data[i].category]++
    }
  }
  console.log(obj)
  let count = 1;
  document.getElementById("append-product-here").innerHTML = ""
 for(let key in obj){
    let tr = document.createElement("tr")
    let td = document.createElement("td")
    td.innerText = count
    let td1 = document.createElement("td")
    td1.innerText = key
    let td2 = document.createElement("td")
    td2.innerText = obj[key]
    tr.append(td,td1,td2)
    document.getElementById("append-product-here").append(tr)
    count++
 }


}
// 'Sarees', 'Jewellery', 'Dresses', 'Mens Top Were', 'Beauty and health', 'Bags and Footwear', 'Home and Kitchen'

document.getElementById("button").addEventListener("click",()=>{
    let Category = document.getElementById("Category")
    let Title = document.getElementById("Title")
    let Price = document.getElementById("Price")
    let Image = document.getElementById("Image-Url")
    let obj = {
        category : Category.value,
        title : Title.value,
        original_price : Price.value,
        images : [Image.value]
    }
    fetch("https://server-com-wzh0.onrender.com/products",{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
    .then((res)=> res.json())
    .then((data)=>{
        console.log(data);
        alert("Product added")
        location.reload()
    })
    .catch((err)=>{
        console.log(err);
        alert("error")
    })
})

// search here and delete also
document.getElementById('inpu').addEventListener('input',(e)=>{
    console.log("yes");

    let inpu=e.target.value
    let newArr=globleData.filter((ele,ind)=>{
       return ele.title.toLowerCase().includes(inpu)
        
    }) 
    if(inpu.length===0){
        document.getElementById("delete").innerHTML = ""
    }else{
        console.log(newArr)
        render(newArr)
    }
    
    
})

function render(data){
    document.getElementById("delete").innerHTML = ""
    data.forEach((ele,ind) => {
        let div=document.createElement("div")
        let title = document.createElement("h5")
        title.innerText = ele.title
        let price = document.createElement("p")
        price.innerText =ele.original_price
        let button = document.createElement("button")
        button.innerText = "Delete"
        button.addEventListener("click",()=>{
            let confi = confirm("Confirm Delete")
            if(confi){
                deleteItem(ele.id)
                console.log(ele.id);
            }
        })
        div.append(title,price,button)
        document.getElementById("delete").append(div)
    });
}

function deleteItem(id){
    fetch(`https://server-com-wzh0.onrender.com/products/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(obj)
    })
    .then((res)=> res.json())
    .then((data)=>{
        // console.log(data);counttheproducts
        counttheproducts()
        alert("Item Deleted")

    })
    .catch((err)=>{
        console.log(err);
        alert("Item Not Deleted");
    })

}

// // pending and completed


// let orderedData = JSON.parse(localStorage.getItem("pending-order")) || []
// let completeDat = JSON.parse(localStorage.getItem("complete-order")) || []
// let completeData=[]
// appendPending(orderedData)
// console.log(orderedData)
// appendComplete(completeDat)
// console.log(completeDat);


// function appendPending(data){
//     document.getElementById("pending").innerHTML = ""
//     data.forEach((ele,ind) => {
//         let div=document.createElement("div")
//         let title = document.createElement("h5")
//         title.innerText = ele.title
//         let price = document.createElement("p")
//         price.innerText =ele.original_price
//         let button = document.createElement("button")
//         button.innerText = "Ship Order"
//         button.addEventListener("click",()=>{
//             let confi = confirm("Confirm Ship Order")
//             if(confi){
//                 completeDat.push(ele)
//                 localStorage.setItem("complete-order",JSON.stringify(completeDat))
//                 data.splice(ind,1)
//                 appendPending(orderedData)
//                 let temp = JSON.parse(localStorage.getItem("complete-order")) || []
//                 appendComplete(temp)
//             }

//         })
//         div.append(title,price,button)
//         document.getElementById("pending").append(div)
//     });
// }


// function appendComplete(data){
//     document.getElementById("complete").innerHTML = ""
//     data.forEach((ele,ind) => {
//         let div=document.createElement("div")
//         let title = document.createElement("h5")
//         title.innerText = ele.title
//         let price = document.createElement("p")
//         price.innerText =ele.original_price
        
//         div.append(title,price)
//         document.getElementById("complete").append(div)
//     });
// }