
package pr.com.api.usuarios.servico;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pr.com.api.usuarios.modelo.UsuarioModelo;
import pr.com.api.usuarios.repositorio.UsuarioRepositorio;

@Service
public class UsuarioServico {

    @Autowired
    private UsuarioRepositorio UsuarioRepositorio;

    public List<UsuarioModelo> listarTodos() {
        return (List<UsuarioModelo>) UsuarioRepositorio.findAll();
    }

    public UsuarioModelo cadastrarAlterar(UsuarioModelo usuario, String operacao) {
        return UsuarioRepositorio.save(usuario);
    }

    public void remover(Long idLong) {
        UsuarioRepositorio.deleteById(idLong);
    }
}
