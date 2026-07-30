<?php
function gravaLog($descricao, $sufixo = "texto") {
    $arqLog = "";
    $nomeArquivo = "log" . date("Ymd") . $sufixo . ".log";
    try {
        $arqLog = fopen($nomeArquivo, "a+");
    } catch (Exception $e) {
        //exit();
    }
    $dataHora = date("d/m/Y H:i:s");
    $conteudo = $dataHora . " " . $descricao . "\n";
    fwrite($arqLog, $conteudo);
    fclose($arqLog);
}

$nome           = $_POST["nome"];
$email          = $_POST["email"];
$ddd            = $_POST["ddd"];
$telefone       = $_POST["telefone"];
$renda          = $_POST["renda"];

$mensagemInt    = "Renda: R$:{$renda}";

$assunto        = "Hotsite - Simule seu Financiamento [{$nome}]";

//$cadastro = $_POST["aceito"];

$ori            = $_POST["ori"];
$det            = $_POST["det"];

$mensagem       = "
Remetente: $nome<br/>
E-mail: $email<br/>
Telefone: ($ddd) $telefone<br/>
Renda: $renda<br />
";

$mensagemMail   = $mensagem;

/*****************************************************************************************
INTEGRAÇÃO SISTEMA DIREÇÕES
*****************************************************************************************/
/*
--------------------------------------------->
Recebe Token de Acesso
*/
// Dados de Acesso
$username = 'quatro_estacoes';
$password = 'bvmkjfd94';
$pagina = 'http://www.direcoesconsultoria.com.br/api/form/get_token.php?u=' . $username . '&p=' . $password . '';
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $pagina);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$return = curl_exec($ch);
curl_close($ch);
$return = json_decode($return, true);
//gravalog("form-simule::curl::return = $return");
//print_r($return);

// Atribui token e ID do empreendimento a variáveis

$token = $return['token'];
$id_empreendimento = $return['id_empreendimento'];
/*
--------------------------------------------->
Cria um lead
*/
// Adiciona variáveis a um array e as trata
$mensagem = urlencode($mensagem);
$leads = array(
    'nome' => "$nome",
    'email' => "$email",
    'ddd' => "$ddd",
    'telefone' => "$telefone",
    'mensagem' => "$mensagemInt",
    'token' => "$token",
    'id_empreendimento' => "$id_empreendimento",
    'ori' => "$ori",
    'det' => "$det"
);

foreach($leads as $key => $value) {
    $value = str_replace(" ", "+", $value);
    $value = addslashes($value);
    $leads[$key] = $value;
}

// JSON informações Lead
$leadParams = json_encode($leads);
//gravalog("form-simule::curl::leadParams = $leadParams");

// Insere informações no sistema
$pagina = 'http://www.direcoesconsultoria.com.br/api/form/add_lead.php?leads=' . $leadParams . '';
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $pagina);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$return = curl_exec($ch);
//print_r($return);
//gravalog("form-simule::curl::return = $return");
curl_close($ch);
// print_r($return);
/*****************************************************************************************
FIM INTEGRAÇÃO SISTEMA DIREÇÕES
*****************************************************************************************/
echo "1"

//header('Location: http://projetos2.exentdev.com.br/ozquatroestacoes/confirmacao/');
?>