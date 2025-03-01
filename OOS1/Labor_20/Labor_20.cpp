#include <iostream>
#include <string>
using namespace std;

class AuthenticationResult {
    private:
        bool _authenticated;
        string _username;
    public:
        AuthenticationResult(bool authenticated, string username = "unauthenticated_user") 
            : _authenticated{ authenticated }, _username{ username } {}

        bool get_authenticated() { return _authenticated; }
        string get_username() { return _username; }
};


class IAuthenticationMethod {
    public:
        virtual AuthenticationResult authenticate() = 0;
};


class Client {
    private:
        IAuthenticationMethod *_authentication_method = nullptr;
        AuthenticationResult _result = AuthenticationResult(false);
    public:
        void set_authentication_method(IAuthenticationMethod *auth) {
            _authentication_method = auth;
        }
        void execute() {
            _result  = _authentication_method -> authenticate();

            if(_result.get_authenticated()) {
                cout << "Das Programm wird ausgeführt für " << _result.get_username() << "." << endl;
            }
            else {
                cout << "Das Programm konnte nicht ausgeführt werden." << endl;
            }
        }   
};


class MockAuthentication : public IAuthenticationMethod {
    public:
        AuthenticationResult authenticate() {
            return AuthenticationResult(true, "Default");
        }
};


class UsernamePassword : public IAuthenticationMethod {
    public:
        AuthenticationResult authenticate() {
            string Username, Password;

            cout << "Username: " << endl;
            cin >> Username;

            cout << "Password: " << endl;
            cin >> Password;

            if (Username == Password) {
                return AuthenticationResult(true, Username);
            }
            else {
                return AuthenticationResult(false, Username);
            }
        }
};


class Certificate : public IAuthenticationMethod {
    public:
        AuthenticationResult authenticate() {
            string Zertifikatsaussteller;
 
            cout << "Zertifikatsaussteller: " << endl;
            cin >> Zertifikatsaussteller;

            if (Zertifikatsaussteller == "hs-esslingen") {
                return AuthenticationResult(true, "certificate.owner");
            }
            else {
                return AuthenticationResult(false);
            }
        }
};

int main(int argc, char* argv[]) {
    Client client;

    cout << "Authentifizierung über die Authentifizierungsmethode Mock Authentication" << endl;
    IAuthenticationMethod* mock_authentication = new MockAuthentication();
    client.set_authentication_method(mock_authentication);
    client.execute();

    cout << "Authentifizierung über die Authentifizierungsmethode Username Password" << endl;
    IAuthenticationMethod* username_password = new UsernamePassword();
    client.set_authentication_method(username_password);
    client.execute();

    cout << "Authentifizierung über die Authentifizierungsmethode Zertifikat" << endl;
    IAuthenticationMethod* certificate = new Certificate();
    client.set_authentication_method(certificate);
    client.execute();
    return 0;
}