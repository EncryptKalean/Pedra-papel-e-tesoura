const titulo = document.querySelector('h1'),
                  opcoes = document.querySelectorAll('.player-options img'),
                  opcoesInimigo = document.querySelectorAll('.enemy-options img');
            var podeJogar = true,
                jogada = '',
                jogadaAdversario = ''

            opcoes.forEach((esse)=>{
                esse.addEventListener('click',()=>{
                    if(podeJogar == true){
                        opcoes.forEach((essenao)=>{essenao.style.opacity = '0.3'})
                        podeJogar = false
                        esse.style.opacity = '1'
                        jogada = esse.id
                        jogadaInimiga()
                     }
                 })
            })

            function jogadaInimiga(){
                let jogadaInimigo = Math.floor(Math.random() * 3)
                opcoesInimigo.forEach((op)=>{op.style.opacity = '0.3'})
                for(let i = 0; i < opcoesInimigo.length; i++){
                    if(i == jogadaInimigo){
                        jogadaAdversario = opcoesInimigo[i].id
                        opcoesInimigo[i].style.opacity = '1'
                        resultado();
                        setTimeout(()=>{
                            jogadaAdversario = ''
                            jogada = ''
                            opcoesInimigo.forEach((op)=>{op.style.opacity = '0.3'})
                            opcoes.forEach((op)=>{op.style.opacity = '0.3'})
                            titulo.innerText = "Pedra, papel ou tesoura!"
                            podeJogar = true
                        }
                            ,1500)
                    }
                }
                
            }
            
            function resultado(){
               let resultados = {
                    pedra: {papel: "Você perdeu :(", tesoura: "Você venceu :)"},
                    papel: {tesoura: "Você perdeu :(", pedra: "Você venceu :)"},
                    tesoura: {pedra: "Você perdeu :(", papel: "Você venceu :)"}
                }
                if(jogada == jogadaAdversario){titulo.innerText = "EMPATE!!"}
                else{titulo.innerText = resultados[jogada][jogadaAdversario];}
            }