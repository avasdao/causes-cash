<template>
    <div role="tabpanel" class="tab-pane" id="messages">
        <div class="start-form">
            <form action="javascript://">
                <div class="field">
                    <label for="contactemail">Contact details</label>

                    <input type="email" id="contactemail">
                </div>

                <div class="field">
                    <label for="individual">Funds recipient</label>

                    <span class="label-desc">
                        Enter the account you’d like to use to receive funds if your project is successfully funded.
                        The account should belong to the person or legal entity running this project.
                        Once you launch, this information cannot be changed.
                    </span>

                    <div class="field-radio">
                        <input type="radio" id="individual" name="fund">

                        <label for="individual">Individual</label>
                    </div>

                    <div class="field-radio">
                        <input type="radio" id="legal" name="fund">

                        <label for="legal">Legal entity (company or organization)</label>
                    </div>
                </div>

                <div class="start-box">
                    <h4>Identity verification</h4>

                    <p>
                        Please verify your identity with your legal name and details (no nicknames or abbreviations).
                        If you’re running this project as a legal entity, a legal representative of the organization should complete this section.
                    </p>

                    <p>
                        <strong>Note:</strong>
                        This name will be displayed publicly on your creator bio.
                    </p>

                    <div class="field">
                        <label for="fname">First name</label>
                        <input type="text" id="fname">
                    </div>

                    <div class="field">
                        <label for="lname">Last name</label>
                        <input type="text" id="lname">
                    </div>

                    <div class="field">
                        <label for="birthday">Birthday</label>
                        <input type="date" id="birthday">
                    </div>

                    <div class="field">
                        <label for="address">Address</label>
                        <input type="text" id="address">
                    </div>

                    <div class="field">
                        <label for="city">City</label>
                        <input type="text" id="city">
                    </div>

                    <div class="field">
                        <label for="postal">Postal code</label>

                        <input type="text" id="postal">
                    </div>
                </div>

                <input type="submit" class="btn-primary" value="Submit">
            </form>
        </div>
    </div>
</template>

<script>
export default {
    components: {
        //
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
/*  */
</style>
