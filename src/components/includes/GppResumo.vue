<template>
    <div class="col-md-12 col-lg-12">
        <div class="card shadow border-0">
            <div class="card-header border-0 bg-primary text-white">
                <h3 class="mt-0">Resumo</h3>
            </div>
            <div class="card-body show-resumo-body p-0">
                <table class="table table-striped">
                  <tbody>
                    <tr><td><b>Aberto</b></td></tr>
                    <tr>
                        <td>
                            <ul>
                                <li>Total: R$ 89.330.722,07</li>
                                <li>Multa: - R$ 1.707.805,63</li>
                                <li>Juros: - R$ 15.848.214,18</li>
                                <li>Correção: - R$ 0,00</li>
                            </ul>
                        </td>
                    </tr>
                    <tr><td><b>Renegociado</b></td></tr>
                    <tr>
                        <td>
                            <ul>
                                <li>Total: R$ 409,67</li>
                                <li>Multa: R$ 8,03</li>
                                <li>Juros: R$ 26,39</li>
                                <li>Correção: R$ 25,25</li>
                            </ul>
                        </td>
                    </tr>
                    <tr><td><b>Pago</b></td></tr>
                    <tr>
                        <td>R$ 0,00</td>
                    </tr>
                    <tr><td><b>Divida ativa</b></td></tr>
                    <tr>
                        <td>
                            <ul>
                                <li>Total: R$ 0,00</li>
                                <li>Multa: R$ 0,00</li>
                                <li>Juros: R$ 0,00</li>
                                <li>Correção: R$ 0,00</li>
                            </ul>
                        </td>
                    </tr>
                    <tr><td><b>Divida ativa paga</b></td></tr>
                    <tr>
                        <td>R$ 0,00</td>
                    </tr>
                    <tr><td><b>Divida ativa</b></td></tr>
                    <tr>
                        <td>0</td>
                    </tr>
                    <tr><td><b>Invadido</b></td></tr>
                    <tr>
                        <td>0</td>
                    </tr>
                    <tr><td><b>Ações</b></td></tr>
                    <tr>
                        <td>0</td>
                    </tr>
                    <tr><td><b>Unidades</b></td></tr>
                    <tr>
                        <td>5409</td>
                    </tr>
                    <tr><td><b>Blocos</b></td></tr>
                    <tr>
                        <td>2144</td>
                    </tr>
                    <tr><td><b>Empreendimentos</b></td></tr>
                    <tr>
                        <td>798</td>
                    </tr>
                  </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GppResumo',
    props: ['gest']
}
</script>
