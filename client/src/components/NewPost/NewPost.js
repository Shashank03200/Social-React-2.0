
import './NewPost.css';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import { Button } from 'reactstrap'
import { Form, FormGroup, Label, Input } from 'reactstrap';
const NewPost = (props) => {
    return (
        <div className="Backdrop">
            <div className="NewPost">
                <div className="NewPostWrapper">
                    <div className="NewPostTop">

                        <img className="ProfileImage" src={process.env.PUBLIC_URL + '/assets/person/1.jpeg'} alt="profileImage" />
                        <Form>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                                <button onClick={props.onCancel}>Cancel</button>
                            </FormGroup>
                        </Form>
                    </div>
                    <hr className="NewPostHR" />
                    <div className="NewPostBottom">
                        <div className="ShareOptions">
                            <div className="ShareOption">
                                <PermMediaIcon className="ShareIcon" /><span className="ShareOptionText">Add a photo</span>
                            </div>

                        </div>
                        //! ButtonHere
                        <Button color="success">Post</Button>{' '}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default NewPost;