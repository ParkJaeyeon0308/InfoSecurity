var alphabetBoard = [['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '']]; 
	    var oddFlag = false; //글자수 출력
        var zCheck = "";

        function Encrypt() {
            //복호화 들어갈 변수
            var decryption;
            //암호화 들어갈 변수
            var encryption;
            //빈칸 체크
            var blankCheck = "";
            var blankCheckCount = 0;

            //html에 전송
            SetBoard($("#key").val());

            for (var i = 0; i < str.length; i++ ) {
                if (str.charAt(i) == ' ') { // 공백제거
                    str = str.substring(0, i) + str.substring(i + 1, str.length());
                    blankCheck += 10;
                } else {
                    blankCheck += 0;
                }

                if (str.charAt(i) == 'z') { // z를 q로 바꿔줘서 처리함.
                    str = str.substring(0, i) + 'q' + str.substring(i + 1, str.length());
                    zCheck += 1;
                } else {
                    zCheck += 0;
                }
            }
            
            encryption = strEncryption($("#key").val(), $("#str").val());

            $("#txtar_encrypted_str").val(encryption);

            for (var i = 0; i < encryption.length; i++) {
                if (encryption.charAt(i) == ' ') // 공백제거
                    encryption = encryption.substring(0, i) + encryption.substring(i + 1, encryption.length);
            }

            decryption = strDecryption(key, encryption, zCheck);

            for (var i = 0; i < decryption.length ; i++) {
                if (blankCheck.charAt(i) == '1') {
                    decryption = decryption.substring(0, i) + " " + decryption.substring(i, decryption.length());
                }
            }

            $("#txtar_decrypted_str").val(decryption);
        }

        function SetBoard(key) {
            var keyForSet = "";					// 중복된 문자가 제거된 문자열을 저장할 문자열.
            var duplicationFlag = false;		// 문자 중복을 체크하기 위한 flag 변수.
            var keyLengthCount = 0;					// alphabetBoard에 keyForSet을 넣기 위한 count변수.
            
            

            if(key == key.toUpperCase()){ //대문자면 대문자로 처리
                key+="ABCDEFGHIJKLMNOPQRSTUVWXYZ";

                for (var i = 0; i < key.length; i++) {
                    for (var j = 0; j < keyForSet.length; j++ ) {
                        if (key.charAt(i) == keyForSet.charAt(j)) {
                            duplicationFlag = true;
                            break;
                        }
                    }
    
                    if (!(duplicationFlag)) keyForSet += key.charAt(i);
    
                    duplicationFlag = false;
                }
    
                for (var i = 0; i < alphabetBoard.length; i++ ) {
                    for (var j = 0; j < alphabetBoard[i].length; j++ ) {
                        alphabetBoard[i][j] = keyForSet.charAt(keyLengthCount++);
                    }
                }
    
                var str_encrypt_tbl = "";
    
                //배열에 대입
                for (var i = 0; i < alphabetBoard.length; i++) {
                    for (var j = 0; j < alphabetBoard[i].length; j++) {
                        str_encrypt_tbl += alphabetBoard[i][j] + " ";
                    }
    
                    str_encrypt_tbl += "\n";
                }	
    
                $("#txtar_encrypt_tbl").val(str_encrypt_tbl);
            }else{ //아니면 소문자로 처리
                key += "abcdefghijklmnopqrstuvwxyz";
                for (var i = 0; i < key.length; i++) {
                    for (var j = 0; j < keyForSet.length; j++ ) {
                        if (key.charAt(i) == keyForSet.charAt(j)) {
                            duplicationFlag = true;
                            break;
                        }
                    }
    
                    if (!(duplicationFlag)) keyForSet += key.charAt(i);
    
                    duplicationFlag = false;
                }
    
                for (var i = 0; i < alphabetBoard.length; i++ ) {
                    for (var j = 0; j < alphabetBoard[i].length; j++ ) {
                        alphabetBoard[i][j] = keyForSet.charAt(keyLengthCount++);
                    }
                }
    
                var str_encrypt_tbl = "";
    
                //배열에 대입
                for (var i = 0; i < alphabetBoard.length; i++) {
                    for (var j = 0; j < alphabetBoard[i].length; j++) {
                        str_encrypt_tbl += alphabetBoard[i][j] + " ";
                    }
    
                    str_encrypt_tbl += "\n";
                }	
    
                $("#txtar_encrypt_tbl").val(str_encrypt_tbl);
            }
            }
             	// 키에 모든 알파벳을 추가.
            
            // 중복처리
            

        function strEncryption(key, str) {
            str = str.replace(/ /g,"");//상시 공백제거
            var playFair = new ArrayList();
            var encPlayFair = new ArrayList();
            var x1 = 0, x2 = 0, y1 = 0, y2 = 0;
            var encStr = "";

            for (var i = 0; i < str.length; i += 2 ) // arraylist 세팅
            {
                var tmpArr = new Array(2);
                tmpArr[0] = str.charAt(i);

                if (i < str.length - 1) {
                    if (str.charAt(i) == str.charAt(i + 1)) { // 글이 반복되면 x추가
                        tmpArr[1] = 'x';
                        i--;
                    } else {
                        tmpArr[1] = str.charAt(i + 1);
                    }
                } else {
                    tmpArr[1] = 'x';
                    oddFlag = true;
                }

                playFair.add(tmpArr);
            }

            var str_encrypt_tgt = "";

            for (var i = 0; i < playFair.size(); i++) {
                //쌍자로 묶음
                console.log(playFair.get(i)[0] + "" + playFair.get(i)[1]);
                str_encrypt_tgt += playFair.get(i)[0] + "" + playFair.get(i)[1] + " ";
            }

            $("#txtar_encrypt_tgt").val(str_encrypt_tgt);

            for (var i = 0; i < playFair.size(); i++)
            {
                var tmpArr = new Array(2);

                for (var j = 0; j < alphabetBoard.length; j++) //쌍자암호의 각각 위치체크
                {
                    for (var k = 0; k < alphabetBoard[j].length; k++)
                    {
                        if (alphabetBoard[j][k] == playFair.get(i)[0]) {
                            //하나하나 체크하기
                            x1 = j;
                            y1 = k;
                        }

                        if (alphabetBoard[j][k] == playFair.get(i)[1]) {
                            //하나하나 체크하기
                            x2 = j;
                            y2 = k;
                        }
                    }
                }
                
                if (x1 == x2) //행이 같은경우
                {
                    tmpArr[0] = alphabetBoard[x1][(y1 + 1) % 5];
                    tmpArr[1] = alphabetBoard[x2][(y2 + 1) % 5];
                }
                else if (y1 == y2) //열이 같은 경우
                {
                    tmpArr[0] = alphabetBoard[(x1 + 1) % 5][y1];
                    tmpArr[1] = alphabetBoard[(x2 + 1) % 5][y2];
                }
                else //행, 열 모두 다른경우
                {
                    tmpArr[0] = alphabetBoard[x2][y1];
                    tmpArr[1] = alphabetBoard[x1][y2];
                }

                encPlayFair.add(tmpArr);
            }

            for (var i = 0; i < encPlayFair.size() ; i++)
            {
                //쌍자로 묶어 평문 암호화시킴
                encStr += encPlayFair.get(i)[0] + "" + encPlayFair.get(i)[1] + " ";
            }

            return encStr;
        }

        function strDecryption(key, str, zCheck) {
            str = str.replace(/ /g,"");//상시 공백제거
            var playFair = new ArrayList(); // 바꾸기 전 쌍자암호를 저장할 곳
            var decPlayFair = new ArrayList(); // 바꾼 후의 쌍자암호 저장할 곳
            var x1 = 0, x2 = 0, y1 = 0, y2 = 0; //쌍자 암호 두 글자의 각각의 행,열 값
            var decStr = "";

            var lengthOddFlag = 1;


            for (var i = 0; i < str.length; i += 2 ) {
                var tmpArr = new Array(2); //2차원 배열 생성
                tmpArr[0] = str.charAt(i);
                tmpArr[1] = str.charAt(i + 1);
                playFair.add(tmpArr);
            }


            for (var i = 0; i < playFair.size(); i++)
            {
                var tmpArr = new Array(2);//새로 만들기

                for (var j = 0; j < alphabetBoard.length; j++ )
                {
                    for (var k = 0; k < alphabetBoard[j].length; k++ )
                    {
                        if (alphabetBoard[j][k] == playFair.get(i)[0]) {
                            //체크
                            x1 = j;
                            y1 = k;
                        }
                        if (alphabetBoard[j][k] == playFair.get(i)[1]) {
                            x2 = j;
                            y2 = k;
                        }
                    }
                }

                if (x1 == x2) //행이 같은 경우 각각 바로 아래열 대입
                {
                    tmpArr[0] = alphabetBoard[x1][(y1 + 4) % 5];
                    tmpArr[1] = alphabetBoard[x2][(y2 + 4) % 5];
                }
                else if (y1 == y2) //열이 같은 경우 각각 바로 옆 열 대입
                {
                    tmpArr[0] = alphabetBoard[(x1 + 4) % 5][y1];
                    tmpArr[1] = alphabetBoard[(x2 + 4) % 5][y2];
                }
                else //행, 열 다른경우 각자 대각선에 있는 곳.
                {
                    tmpArr[0] = alphabetBoard[x2][y1];
                    tmpArr[1] = alphabetBoard[x1][y2];
                }

                decPlayFair.add(tmpArr);

            }

            for (var i = 0; i < decPlayFair.size() ; i++) //중복 문자열 돌려놓음
            {
                if (i != decPlayFair.size() - 1 && decPlayFair.get(i)[1] == 'x'
                    && decPlayFair.get(i)[0] == decPlayFair.get(i + 1)[0]) {
                    decStr += decPlayFair.get(i)[0];
                }
                else {
                    decStr += decPlayFair.get(i)[0] + "" + decPlayFair.get(i)[1];
                }
            }



            for (var i = 0; i < zCheck.length ; i++ )//z위치 찾아서 q로 돌려놓음
            {
                if (zCheck.charAt(i) == '1')
                    decStr = decStr.substring(0, i) + 'z' + decStr.substring(i + 1, decStr.length());

            }



            if (oddFlag) decStr = decStr.substring(0, decStr.length - 1);

            
            return decStr;
        }

        ArrayList = function (arr) { //this 처리 해주기
            var items = [];
            if (arr) items = items.concat(arr);
            this.count = items.length;
            this.add = function (obj) {
                //add object 하기
                items.push(obj);
                this.count = items.length;
            };
            this.addRange = function (a) {
                //range Arraylist 처리
                if (a.getIterator) {
                    var e = a.getIterator();
                    while (!e.atEnd()) {
                        this.add(e.get());
                    }
                    this.count = items.length;
                } else {
                    for (var i = 0; i < a.length; i++) {
                        items.push(a[i]);
                    }
                    this.count = items.length;
                }
            };
            this.clear = function () {
                //나눠주기
                items.splice(0, items.length);
                this.count = 0;
            };
            this.clone = function () {
                // 넣어주기
                return new dojox.collections.ArrayList(items); 
            };
            this.contains = function (obj) {
                for (var i = 0; i < items.length; i++) {
                    if (items[i] == obj) {
                        return true; // boolean
                    }
                }
                return false; // boolean
            };
            this.forEach = function ( fn,  scope) {
                dojo.forEach(items, fn, scope);
            };
            this.get = function (index) {
                return items[index];
            };
            this.size = function () {
                return items.length;
            };
            this.getIterator = function () {
                return new dojox.collections.Iterator(items);
            };
            this.indexOf = function (/* object */obj) {
                for (var i = 0; i < items.length; i++) {
                    if (items[i] == obj) {
                        return i; // int
                    }
                }
                return -1; // int
            };
            this.insert = function (i, obj) {
                // insert
                items.splice(i, 0, obj);
                this.count = items.length;
            };
            this.item = function (i) {
                return items[i]; // object
            };
            this.remove = function (obj) {
                var i = this.indexOf(obj);
                if (i >= 0) {
                    items.splice(i, 1);
                }
                this.count = items.length;
            };
            this.removeAt = function (i) {
                items.splice(i, 1);
                this.count = items.length;
            };
            this.reverse = function () {
                items.reverse();
            };
            this.sort = function (fn) {
                //item들 sort처리
                if (fn) {
                    items.sort(fn);
                } else {
                    items.sort();
                }
            };
            this.setByIndex = function ( i,  obj) {
                items[i] = obj;
                this.count = items.length;
            };
            this.toArray = function () {
                return [].concat(items);
            }
            this.toString = function ( delim) {
                return items.join((delim || ","));
            };
        };