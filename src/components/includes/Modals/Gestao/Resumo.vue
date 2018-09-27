<template>
    <div>
        <div class="modal fade" id="modalResumo" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg shadow" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalResumoLabel">Resumo</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
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
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GestaoResumo',
    props: ['datas'],
    mounted() {
        
    }
}
</script>