function activeImgOversize() {
	if(imgOversize.className == 'image-sizes-deactive') {
		imgSuperOversize.className = 'image-sizes-deactive';
		imgOversize.className = 'image-sizes-active';
	}
}

function activeImgSOversize() {
	if(imgSuperOversize.className == 'image-sizes-deactive') {
		imgOversize.className = 'image-sizes-deactive';
		imgSuperOversize.className = 'image-sizes-active';
	}
}

let imgMan = {
	oversize_link : 'http://santbear.ru/wp-content/uploads/2021/03/futbolka_muzhskaya_oversize_for_site_watermark.png',
	superoversize_link : 'http://santbear.ru/wp-content/uploads/2021/03/futbolka_muzhskaya_superoversize_for_site_watermark.png'
}

let imgWoman = {
	oversize_link : 'http://santbear.ru/wp-content/uploads/2021/03/futbolka_zhenskaya_oversize_for_site_watermark.png',
	superoversize_link : 'http://santbear.ru/wp-content/uploads/2021/03/futbolka_zhenskaya_superoversize_for_site.png'
}

function createImage(objImage) {

	let divman = document.createElement('div');
	let divResultOversize = document.getElementById('result-oversize-calc');
	divman.className = 'result-div-ragdoll';
	//Изображение оверсайз
	let imgOversize = document.createElement("img");
	imgOversize.src = objImage.oversize_link;
	imgOversize.setAttribute('id', 'imgOversize');
	imgOversize.className = 'image-sizes-active';
	//Изображение супероверсайз
	let imgSOversize = document.createElement("img");
	imgSOversize.src = objImage.superoversize_link;
	imgSOversize.setAttribute('id', 'imgSuperOversize');
	imgSOversize.className = 'image-sizes-deactive';
	//Кнопки
	let butOversize = document.createElement("a");
	butOversize.className = "but-homepage-allprod";
	butOversize.setAttribute('id', 'buttonOversize');
	butOversize.setAttribute('onclick', 'activeImgOversize()');
	butOversize.innerHTML = "Oversize";
	let butSOversize = document.createElement("a");
	butSOversize.className = "but-homepage-allprod";
	butSOversize.setAttribute('id', 'buttonSuperoversize');
	butSOversize.setAttribute('onclick', 'activeImgSOversize()');
	butSOversize.innerHTML = "Super Oversize";

	divman.appendChild(imgOversize);
	divman.appendChild(imgSOversize);
	divResultOversize.appendChild(butOversize);
	divResultOversize.appendChild(butSOversize);

	return divman;

}

let validateForms = function(selector, rules, successModal) {
	new window.JustValidate(selector, {
		rules: rules
	});
}

	let elemForm = document.getElementById('formHandler');

	validateForms('.form-handler', { height: {required: true}, mass: {required: true} }, '.somewhere');

	elemForm.submit = async(e) => {

	 if(elemForm.height.value != "" && elemForm.mass.value != "") {

		 let response = await fetch('https://santbear.ru/wp-content/themes/storefront/handler-height.php', {
				 method: 'POST',
				 body: new FormData(elemForm)
			});

			let divRes = document.getElementById("result-calc");
			while (divRes.hasChildNodes()) {
    		divRes.removeChild(divRes.firstChild);
			}

		$('#result-calc').prepend('<p>Загрузка...</p>');
		 if(response.ok) {
		 		let result = await response.text();
		 		let divRes = document.getElementById("result-calc");
				divRes.innerHTML = '';
				$('#result-calc').prepend(result);
				if(!document.getElementById('size-not-fined')) {
					if(document.getElementsByName('sex')[0].checked){
						let div = createImage(imgMan);
						divRes.appendChild(div);
					}
					else if(document.getElementsByName('sex')[1].checked){
						let div = createImage(imgWoman);
						divRes.appendChild(div);
					}
				}
				if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
					document.location.href = "#result-calc";
				}
	 	 } else {
			 	document.getElementById('result-oversize-calc').innerHTML = '';
			  $('#result-calc').prepend('<p>Не удалось загрузить...</p>');
		 }
			return false;
		}
	}
