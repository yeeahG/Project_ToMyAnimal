package team1.toMyAnimal.exception;

import java.io.IOException;

public class FileUploadFailureException extends RuntimeException {
    public FileUploadFailureException(Throwable cause) {
        super(cause);
    }
}
