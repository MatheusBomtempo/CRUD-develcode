package pr.com.api.usuarios.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import pr.com.api.usuarios.modelo.UsuarioModelo;
import pr.com.api.usuarios.servico.ImagemServico;
import pr.com.api.usuarios.servico.UsuarioServico;

import java.io.IOException;

@CrossOrigin(origins = "*")
@RestController
public class UsuarioControle {

    @Autowired
    private UsuarioServico usuarioServico;

    @Autowired
    private ImagemServico imagemServico;

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestParam("foto") MultipartFile foto, @RequestParam("nome") String nome,
            @RequestParam("data_nascimento") String dataNascimento) {
        try {
            byte[] fotoBytes = imagemServico.converterImagemParaBytes(foto);
            UsuarioModelo usuario = new UsuarioModelo();
            usuario.setNome(nome);
            usuario.setDataNascimento(dataNascimento);
            usuario.setFoto(fotoBytes);
            return ResponseEntity.ok(usuarioServico.cadastrarAlterar(usuario, "cadastrar"));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Erro ao processar a imagem.");
        }
    }

    @PutMapping("/alterar")
    public ResponseEntity<?> alterar(@RequestParam("idLong") Long idLong,
            @RequestParam(value = "foto", required = false) MultipartFile foto,
            @RequestParam("nome") String nome, @RequestParam("data_nascimento") String dataNascimento) {
        try {
            byte[] fotoBytes = foto != null ? imagemServico.converterImagemParaBytes(foto) : null;
            UsuarioModelo usuario = new UsuarioModelo();
            usuario.setIdLong(idLong);
            usuario.setNome(nome);
            usuario.setDataNascimento(dataNascimento);
            usuario.setFoto(fotoBytes);
            return ResponseEntity.ok(usuarioServico.cadastrarAlterar(usuario, "alterar"));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Erro ao processar a imagem.");
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<?> listar() {
        try {
            return ResponseEntity.ok(usuarioServico.listarTodos());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Erro ao buscar usuários.");
        }
    }

    @DeleteMapping("/remover/{idLong}")
    public ResponseEntity<?> remover(@PathVariable Long idLong) {
        try {
            usuarioServico.remover(idLong);
            return ResponseEntity.ok("Usuário removido com sucesso!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Erro ao remover usuário.");
        }
    }
}
