import { FormRow, TextInput } from '@leffot/form-controls'

export default function NameFields() {
    return (
        <>
            <FormRow style='half'>
                <div>
                    <TextInput
                        id='merge_fields.FNAME'
                        label='First name'
                        name='merge_fields.FNAME'
                        placeholder='Your first name'
                        type='text'
                    />
                </div>
                <div>
                    <TextInput
                        id='merge_fields.LNAME'
                        label='Last name'
                        name='merge_fields.LNAME'
                        placeholder='Your last name'
                        type='text'
                    />
                </div>
            </FormRow>
        </>
    )
}
