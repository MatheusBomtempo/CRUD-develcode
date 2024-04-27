package pr.com.api.usuarios.servico;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@Service
public class ImagemServico {

    public byte[] converterImagemParaBytes(MultipartFile file) throws IOException {
        return file.getBytes();
    }
}
