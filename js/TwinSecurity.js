	let alphabetBoard = new Array;
    alphabetBoard[5][5];
	let oddFlag = false; //글자수 출력
	let zCheck = "";

	function mirim(){
		const name = document.getElementById('key').value;
		// document.getElementById("result").innerText = mirim;
		let decryption = " ";
		let encryption = " ";
		
		let blankCheck=" ";
		let blankCheckCount = 0;
		let key = name;

		setBoard(key);

		for(let i=0; i<String.length(); i++){
			if(String.charAt(i)==''){
				String = String.substring(0,i)+String.substring(i+1, String.length());
				blankCheck+=10;
			}else{
				blankCheck+=0;
			}if(String.charAt(i)=='z'){
				String = String.substring(0,i)+'q'+String.substring(i+1, String.length());
				zCheck+=1;
			}
			else{
				zCheck+=0;
			}
		}
		encryption = strEncryption(key, String);

		console.log("암호화된 문자열 : "+encryption);

		for(let i =0; i<encryption.length(); i++){
			if(encryption.charAt(i)==' '){ //공백제거
				encryption = encryption.substring(0,i)+encryption.substring(i+1,encryption.length());
		}
		decryption = strDecryption(key, encryption, zCheck);

		for(let i = 0 ; i < decryption.length() ; i++)
		{
			if(blankCheck.charAt(i)=='1')
			{
				decryption = decryption.substring(0,i)+" "+decryption.substring(i,decryption.length());
			}
		}
		console.log("복호화된 문자열 : "+decryption);
		}
		function strDecryption(key, str, zCheck){
			let playFair = new ArrayList();
			let decPlayFair = new ArrayList();

			let x1 = 0
			let x2 =0
			let y1 =0
			let y2 =0;

			let decStr = "";
			let lenthOddFlag = 1;

			for(let i = 0 ; i < String.length() ; i+=2 )
			{
				let tmpArr = new char[2];
				tmpArr[0] = String.charAt(i);
				tmpArr[1] = String.charAt(i+1);
				playFair.add(tmpArr);
			}
			for(let i = 0 ; i < playFair.size() ; i++ )
		{

			let tmpArr = new char[2];
			for(let j = 0 ; j < alphabetBoard.length ; j++ )
			{
				for(let k = 0 ; k < alphabetBoard[j].length ; k++ )
				{
					if(alphabetBoard[j][k] == playFair.get(i)[0])
					{
						x1 = j;
						y1 = k;
					}
					if(alphabetBoard[j][k] == playFair.get(i)[1])
					{
						x2 = j;
						y2 = k;
					}
				}
			}
			if(x1=x2){
				tmpArr[0] = alphabetBoard[x1][(y1+4)%5];
				tmpArr[1] = alphabetBoard[x2][(y2+4)%5];
			}else if(y1==y2){ //열이 같은 경우 각각 바로 옆 열 대입
				tmpArr[0] = alphabetBoard[(x1+4)%5][y1];
				tmpArr[1] = alphabetBoard[(x2+4)%5][y2];
			}else //행, 열 다른경우 각자 대각선에 있는 곳.
			{
				tmpArr[0] = alphabetBoard[x2][y1];
				tmpArr[1] = alphabetBoard[x1][y2];
			}
			decPlayFair.add(tmpArr);
		}
		for(let i = 0 ; i < decPlayFair.size() ; i++) //중복 문자열 돌려놓음
		{
			if(i!=decPlayFair.size()-1 && decPlayFair.get(i)[1]=='x' 
					&& decPlayFair.get(i)[0]==decPlayFair.get(i+1)[0])
			{	
				decStr += decPlayFair.get(i)[0];
			}
			else
			{
				decStr += decPlayFair.get(i)[0]+""+decPlayFair.get(i)[1];
			}
		}
		for(let i = 0 ; i < zCheck.length() ; i++ )//z위치 찾아서 q로 돌려놓음
		{
			if( zCheck.charAt(i) == '1' ) 
				decStr = decStr.substring(0,i)+'z'+decStr.substring(i+1,decStr.length());
				return decStr;
			}
			function strEncryption(key, String){
				let playFair = new ArrayList();
				let encPlayFair = new ArrayList();
		let x1 = 0 , x2 = 0 , y1 = 0, y2 = 0;
		let encStr ="";
		
		
		
		for(let i = 0 ; i < str.length() ; i+=2 ) // arraylist 세팅
		{
			let tmpArr = new char[2];
			tmpArr[0] = str.charAt(i);
			try{
				if( str.charAt(i) == str.charAt(i+1)) //글이 반복되면 x추가
				{
					tmpArr[1] = 'x';
					i--;
				}else{
					tmpArr[1] = str.charAt(i+1);
				}
			}catch(e)
			{
				tmpArr[1] = 'x'; 
				oddFlag = true;
			}
			playFair.add(tmpArr);
		}
		
		for(let i = 0 ; i < playFair.size() ; i++ )
		{
			document.getElementById("result").innerText = playFair.get(i)[0]+""+playFair.get(i)[1]+" ";		}
		console.log();
		
		for(let i = 0 ; i < playFair.size() ; i++ )
		{

			let tmpArr = new char[2];
			for(let j = 0 ; j < alphabetBoard.length ; j++ ) //쌍자암호의 각각 위치체크
			{
				for(let k = 0 ; k < alphabetBoard[j].length ; k++ )
				{
					if(alphabetBoard[j][k] == playFair.get(i)[0])
					{
						x1 = j;
						y1 = k;
					}
					if(alphabetBoard[j][k] == playFair.get(i)[1])
					{
						x2 = j;
						y2 = k;
					}
				}
			}
			
			
			if(x1==x2) //행이 같은경우
			{
				tmpArr[0] = alphabetBoard[x1][(y1+1)%5];
				tmpArr[1] = alphabetBoard[x2][(y2+1)%5];
			}
			else if(y1==y2) //열이 같은 경우
			{
				tmpArr[0] = alphabetBoard[(x1+1)%5][y1];
				tmpArr[1] = alphabetBoard[(x2+1)%5][y2];
			} 
			else //행, 열 모두 다른경우
			{
				tmpArr[0] = alphabetBoard[x2][y1];
				tmpArr[1] = alphabetBoard[x1][y2];
			}
			
			encPlayFair.add(tmpArr);
			
		}
		
		for(let i = 0 ; i < encPlayFair.size() ; i++)
		{
			encStr += encPlayFair.get(i)[0]+""+encPlayFair.get(i)[1]+" ";
		}
		
		
		return encStr;
	}

	function setBoard( key) {
		let keyForSet = "";					// 중복된 문자가 제거된 문자열을 저장할 문자열.
		let duplicationFlag = false;		// 문자 중복을 체크하기 위한 flag 변수.
		let keyLengthCount = 0;					// alphabetBoard에 keyForSet을 넣기 위한 count변수.
		
		key += "abcdefghijklmnopqrstuvwxyz"; 	// 키에 모든 알파벳을 추가.

		
		// 중복처리
		for(let i = 0 ; i < key.length() ; i++ ) 
		{
			for(let j = 0 ; j < keyForSet.length() ; j++ )
			{
				if(key.charAt(i)==keyForSet.charAt(j))
				{
					duplicationFlag = true;
					break;
				}
			}
			if(!(duplicationFlag)) keyForSet += key.charAt(i);
			duplicationFlag = false;
		}
		//배열에 대입
		for(let i = 0 ; i < alphabetBoard.length ; i++ )
		{
			for(let j = 0; j <alphabetBoard[i].length ; j++ )
			{
				alphabetBoard[i][j] = keyForSet.charAt(keyLengthCount++);
			}
		}		
		//배열에 대입
		for(let i = 0 ; i < alphabetBoard.length ; i++ )
		{
			for(let j = 0; j <alphabetBoard[i].length ; j++ )
			{
				console.log(alphabetBoard[i][j]+"-");
			}
			console.log();
		}		
						
		
	}
}
	}