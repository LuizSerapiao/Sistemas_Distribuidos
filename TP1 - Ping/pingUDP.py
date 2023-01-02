import socket
import os
import time

# Codigo feito para Python2
# Teste de ping, medindo o tempo de envio até a resposta do servidor, 
# servidor responde com mesma mensagem utilizada no envio.

udp_ip = "sd.dcc.ufla.br"
udp_port = 6000

sock = socket.socket(socket.AF_INET, # Internet 
				 socket.SOCK_DGRAM)  # UDP
sock.settimeout(0.001)
listaPing = []
print("\nTeste de ping:")
i = 0
pacotesPerdidos = 0
pacotesAtrasados = 0
nPacotes = 10 # Quantidade de pacotes a serem enviados
tamPacote = 5 # Tamanho do pacote a ser recebido
while i in range(nPacotes):
    mensagem = None
    enviado = "Hexa%s"%str(i) # Mensagem com codigo a ser enviada
    try:
        inicio = time.time()
        sock.sendto(enviado, (udp_ip, udp_port))
        mensagem = sock.recvfrom(tamPacote)
        if mensagem[0] == enviado: # Checando se pacote nao eh atrasado
            tempoSegundos = (time.time() - inicio)
            tempoMs = tempoSegundos*1000 # Conversao para tempo em ms
            listaPing.append(tempoMs)
            print("%sms"%"{:.3f}".format(tempoMs))
        else:
            pacotesAtrasados += 1
            print("Pacote Atrasado de valor: "+mensagem[0])
    except socket.error:
        print("timeout!")
        pacotesPerdidos += 1
    i = i+1
    if(i%10 == 0):
        tamPacote+=1
    time.sleep(1)
i = 0
tam = len(listaPing)
media = 0
totalPerdidos = pacotesPerdidos + pacotesAtrasados
taxaPerdidos = (float(totalPerdidos)/float(nPacotes))*100
if(tam>0): #Teste para que nao haja divisao por 0
    for i in range(tam):
        media = media + listaPing[i]
    media = media/tam
    print("\nMedia de ping: %sms"%"{:.3f}".format(media))
else:
    print("\nMedia de ping: ---")
print("Pacotes enviados: {pacotes}".format(pacotes = nPacotes))
print("Pacotes atrasados: {atrasados}".format(atrasados = pacotesAtrasados))
print("Pacotes perdidos: {perdidos}".format(perdidos = pacotesPerdidos))
print("Taxa de perda de pacotes: {taxa}%".format(taxa = taxaPerdidos))
