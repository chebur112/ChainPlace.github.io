const btnDoc = document.getElementById("doc");
const btnRules = document.getElementById("rules");
const btnStart = document.getElementById("start");

const modal1 = document.getElementById("text1");
const modal2 = document.getElementById("text2");

btnDoc.onclick = () => modal1.style.display = "block";
btnRules.onclick = () => modal2.style.display = "block";
btnStart.onclick = () => 


document.querySelectorAll(".close").forEach(btn => {
  btn.onclick = () => {
    const targetId = btn.getAttribute("data-target");
    document.getElementById(targetId).style.display = "none";
  };
});


window.onclick = (event) => {
  [modal1, modal2].forEach(modal => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
};

