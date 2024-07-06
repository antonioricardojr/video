import { useState } from "react";
import PropTypes from 'prop-types';



function PostForm({ post, headerText, onSubmit, buttonText }) {

    const [formData, setFormData] = useState(post || { title: "", body: "", image: "" } );

    return  (
        <div>
            <h2>{headerText}</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                onSubmit(formData);
            }}>
                <div>
                    <label htmlFor="titleInput">Title:</label>
                    <input 
                    id="titleInput" 
                    type="text" value={formData.title} 
                    onChange={(e) => setFormData(
                        {...formData, 
                            title: e.target.value
                        })}
                    required
                    />
                </div>

                <div>
                    <label htmlFor="image">Image:</label>
                    <input 
                    id="image" 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => {setFormData(
                        {...formData, 
                            image: e.target.files[0]
                        })
                        console.log(e.target.files[0]);
                    }}
                    />
                </div>

                <div>
                    <label htmlFor="bodyInput">Body:</label>
                    <textarea 
                    id="bodyInput" 
                    value={formData.body} 
                    onChange={(e) => setFormData(
                        {...formData,
                            body: e.target.value
                        })}
                    required
                    >
                    </textarea>
                </div>
                <div>
                    <button type="submit">{buttonText}</button>
                </div>
            </form>
        </div>
    )
}


PostForm.propTypes = {
    post: PropTypes.shape({
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    }),
    headerText: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
  };


export default PostForm;