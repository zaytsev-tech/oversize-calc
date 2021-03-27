<?php
	$height = htmlentities($_POST['height']);
	$mass = htmlentities($_POST['mass']);
	$sex = htmlentities($_POST['sex']);

	function calcOversize($sex, $height, $mass) {

		$mas0versize = array();
		$masSuperOversize = array();
		$notDataPhrase = 'нет размера';

		$manSizes = [
			[156, 45, 60, '2XS', 'S', 'M'],
			[162, 50, 63, 'XS', 'M', 'L'],
			[170, 54, 72, 'S', 'L', 'XL'],
			[176, 60, 75, 'M', 'XL', '2XL'],
			[182, 63, 81, 'L', '2XL', '3XL'],
			[188, 66, 87, 'XL', '3XL', '4XL'],
			[192, 69, 90, '2XL', '4XL', '5XL'],
			[198, 75, 93, '3XL', '5XL', '6XL'],
			[202, 78, 95, '4XL', $notDataPhrase, $notDataPhrase],
			[999, 999, 999, $notDataPhrase, $notDataPhrase, $notDataPhrase]
		];

		$womanSizes = [
			[148, 42, 54, '2XS', 'S', 'M'],
			[153, 45, 60, 'XS', 'M', 'L'],
			[164, 51, 70, 'S', 'L', 'XL'],
			[172, 57, 77, 'M', 'XL', '2XL'],
			[178, 60, 80, 'L', '2XL', '3XL'],
			[183, 63, 85, 'XL', '3XL', '4XL'],
			[190, 65, 91, '2XL', '5XL', $notDataPhrase],
			[999, 999, 999, $notDataPhrase, $notDataPhrase, $notDataPhrase]
		];

		if($sex != 'male' && $sex != 'female') {
			$sex = 'male';
		}

		if($sex == 'male') {
			for($i = 0; $i <= count($manSizes); $i++) {
				if($height >= $manSizes[$i][0] && $height < $manSizes[$i+1][0]) {
					if($mass >= $manSizes[$i][2]) {
							return [$manSizes[$i+1][3], $manSizes[$i+1][4], $manSizes[$i+1][5]];
						}
					if($mass < $manSizes[$i][1]) {
							return [$manSizes[$i-1][3], $manSizes[$i-1][4], $manSizes[$i-1][5]];
						}

					return [$manSizes[$i][3], $manSizes[$i][4], $manSizes[$i][5]];
				}
			}
		}
		if($sex == 'female') {
			for($i = 0; $i <= count($womanSizes); $i++) {
				if($height >= $womanSizes[$i][0] && $height < $womanSizes[$i+1][0]) {
					if($mass >= $womanSizes[$i][2]) {
							return [$womanSizes[$i+1][3], $womanSizes[$i+1][4], $womanSizes[$i+1][5]];
						}
					if($mass < $womanSizes[$i][1]) {
							return [$womanSizes[$i-1][3], $womanSizes[$i-1][4], $womanSizes[$i-1][5]];
						}
					return [$womanSizes[$i][3], $womanSizes[$i][4], $womanSizes[$i][5]];
				}
			}
		}
	}

	$resultCalc = calcOversize($sex, $height, $mass);
	$standardSize = $resultCalc[0];
	$oversize = $resultCalc[1];
	$superOversize = $resultCalc[2];

	if($oversize == '' && $superOversize == '') {
		//$closestSizes = searchClosestSize($width, $mass);
		$oversizeResult = "
		<p id=\"size-not-fined\">Размеров с такими параметрами не найдено</p>
		";
		//<p>Ближайшие возможные параметры: $closestSizes</p>
	} else {
		$oversizeResult = "
		<p>Стандартный размер: $standardSize</p>
		<p>Оверсайз: $oversize</p>
		<p>Супер оверсайз: $superOversize</p>
		";
	}

	$output = "
	<div id='result-oversize-calc'>
		<p>Рост: $height</p>
		<p>Вес: $mass</p></br>
		$oversizeResult </div>";
		echo $output;
?>
