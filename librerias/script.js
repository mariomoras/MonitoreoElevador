        //variables para funcionamiento 
        let totalElevadores = 20;
        let totalDePisos = 5;
        let minPisos = -3;
        let statusElevator = [];
        let tiempoMov = 3000;
        let valRetardoMov = 3000;//2000 para respetar el tiempo de la animación de css
        let tiempoRemplaceImg = 1900;//se coloca 1900 para estar por debajo de los 2s de css
        //1000 = 1s

        //Función para obtener número random entre dos números
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }



        //Función para crear tablas mediante ciclo for
        function crearTablaElevadores(totalEle, totalPisos) {
            var txtTable = `<table class="ml-5" class="table" border="1">`;
            txtTable += `<tr>`;
            for (let i = 0; i < (totalEle + 1); i++) {
                if (i == 0) {
                    txtTable += `<td class="spacettle">Equipo</td>`;
                } else {
                    txtTable += `<td class="spacettle">Elevador ${i}</td>`;
                    statusElevator[i] = 'l';
                }
            }
            txtTable += `</tr>`;
            for (let i = totalPisos; i >= minPisos; i--) {
                txtTable += `<tr>`;
                for (let j = 0; j < (totalEle + 1); j++) {
                    if (j == 0) {
                        txtTable += `<td class="spacettle">Piso ${i}</td>`;
                    } else {
                        txtTable += `<td class="spaceEle" id="c${j}_${i}" align="center"></td>`;
                    }
                }
                txtTable += `</tr>`;
            }

            $("#tablita").html(txtTable);
        }

        //Función para obtener html de la imagen (para no ser repetitivo)
        function getImg(id) {
            return `<img id="el${id}" src="content/img/elevador2.png" width="45" height="65" >`;
        }

        //Función para crear elevadores dentro de la tabla de forma aleatoria
        function crearElevadores(totalEle, totalPisos) {
            for (let i = 1; i < (totalEle + 1); i++) {
                let elev = getImg(i);
                let rnd = getRandomInt(0, totalDePisos);
                $(`#c${i}_${rnd}`).html(elev);
            }
        }
        //i iteracion actual,j el total,m metodo (sum or res)
        function subir(i, j, r) {
            setTimeout(function () {
                //suma
                let elem = $(`#c${r}_${i}`);
                elem.children().addClass('animatedUp');
                //r++;
                setTimeout(function () { elem.html(''); $(`#c${r}_${i}`).html(getImg(r)); }, tiempoRemplaceImg);
                i++;
                if (i < j) {
                    subir(i, j, r);
                } else {
                    setTimeout(function () { statusElevator[r] = ['l']; }, 1000);//tiempo para liberar elevador
                }
            }, valRetardoMov)
        }

        function bajar(i, j, r) {
            setTimeout(function () {
                //suma
                let elem = $(`#c${r}_${i}`);
                elem.children().addClass('animatedDown');
                //r++;
                setTimeout(function () { elem.html(''); $(`#c${r}_${i}`).html(getImg(r)); }, tiempoRemplaceImg);
                i--;
                if (i > j) {
                    bajar(i, j, r);
                } else {
                    setTimeout(function () { statusElevator[r] = ['l']; }, 1000);//tiempo para liberar elevador
                }
            }, valRetardoMov)
        }


        function selctElevator() {
            let eleVselect = getRandomInt(1, totalElevadores);

            let celda = $("#el" + eleVselect).parent().attr("id");
            console.log('Sel ' + eleVselect + ' celda ' + celda);
            let ult = celda.split("_");
            let pisoAct = parseInt(ult[1]);

            if (statusElevator[eleVselect] == 'l') {
                statusElevator[eleVselect] = ['o'];
                if (Math.floor(Math.random() * 100) % 2 == 0) {
                    let hastaPiso = getRandomInt(pisoAct, totalDePisos);

                    if (pisoAct != hastaPiso) {
                        console.log(`Elevador:S ${eleVselect} de piso ${pisoAct} a piso ${hastaPiso}`);
                        subir(pisoAct, hastaPiso, eleVselect);
                    } else {
                        console.log("Ya esta en ultimo piso E:" + eleVselect);
                        setTimeout(function () { statusElevator[eleVselect] = ['l']; }, 1000);
                    }
                }
                else {
                    let hastaPiso = getRandomInt(minPisos, pisoAct);
                    if (pisoAct != hastaPiso) {
                        console.log(`Elevador:B ${eleVselect} de piso ${pisoAct} a piso ${hastaPiso}`);
                        bajar(pisoAct, hastaPiso, eleVselect);
                    } else {
                        console.log("Ya esta en p piso E:" + eleVselect);
                        setTimeout(function () { statusElevator[eleVselect] = ['l']; }, 1000);
                    }
                }
            } else {
                console.log('Elevador ' + eleVselect + ' ocupado');
            }
        }

         $(document).ready(function(){//se ejecutan los metodos creados previamente para crear el html
            crearTablaElevadores(totalElevadores, totalDePisos);
            crearElevadores(totalElevadores, totalDePisos);
            //se ejecuta setInterval para realizar una acción cada cierto tiempo
            let timerId = setInterval(selctElevator, tiempoMov);});

