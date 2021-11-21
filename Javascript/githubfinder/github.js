class Github{
    constructor() {
        this.client_id='13da932c1a551e0c6332';
        this.client_secret =  'df23ca6193a283a82b1e48e15a66f2009a3f2829';
    }
    async getUser(user){
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secrets=${this.client_secret}`);
        const profileData = await profileResponse.json();
        return{
            profile
        }
    }
}