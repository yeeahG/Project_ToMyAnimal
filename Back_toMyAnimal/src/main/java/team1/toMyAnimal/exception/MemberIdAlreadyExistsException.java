package team1.toMyAnimal.exception;

public class MemberIdAlreadyExistsException extends RuntimeException{
    public MemberIdAlreadyExistsException(String message){
        super(message);
    }
}
