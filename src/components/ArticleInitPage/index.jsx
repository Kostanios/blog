import {
  Form, Input, Button,
} from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createArticleThunk, updateArticleThunk } from '../../redux/slices/dataSlice';
import styles from './styles.module.scss';

const ArticleInitPage = ({ slug }) => {
  const context = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();
  const [tags, setTags] = useState(slug ? context.data.viewArticle.tagList.slice() : []);
  const [title, setTitle] = useState(slug ? context.data.viewArticle.title : '');
  const [shortDesc, setShortDesc] = useState(slug ? context.data.viewArticle.description : '');
  const [text, setText] = useState(slug ? context.data.viewArticle.body : '');
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  const addTag = (name) => {
    if (tags.indexOf(name) < 0) {
      tags.push(name);
    }
    setTags(new Array(...tags));
  };
  const removeTag = (name) => {
    setTags(tags.filter((tag) => (tag !== name)));
  };
  const onFinish = (values) => {
    if (slug) {
      dispatch(updateArticleThunk({ article: { tagList: tags, ...values }, slug })).then(() => { history.push('/'); });
    } else {
      dispatch(createArticleThunk({ tagList: tags, ...values })).then(() => { history.push('/'); });
    }
    // console.log('Finish:', { tagList: tags, ...values });
  };
  useEffect(() => {
    forceUpdate({});
  }, []);
  return <div className={styles.container}>
    <div className={styles.articleFormComponent}>
        <header className={styles.header}>{slug ? 'Update article' : 'Create new article'}</header>
        <Form
        className={styles.form}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        >
      <Form.Item
        initialValue={slug ? context.data.viewArticle.title : undefined}
        name="title"
        rules={[
          {
            required: true,
            message: 'Please input your title!',
            whitespace: true,
          },
          {
            min: 3,
            message: 'Title must be at least 3 characters!',
          },
          {
            max: 20,
            message: 'Title must be maximum 20 characters!',
          },
        ]}
      >
        <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>Title</label>
            <Input
              value={title}
              onChange={(event) => { setTitle(event.target.value); }}
              placeholder={'Title'}
            />
        </div>
      </Form.Item>
      <Form.Item
        initialValue={slug ? context.data.viewArticle.description : undefined}
        name="description"
        rules={[
          {
            required: true,
            message: 'Please input your title!',
            whitespace: true,
          },
          {
            max: 60,
            message: 'Short description must be maximum 60 characters!',
          },
        ]}
      >
        <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>Short description</label>
            <Input
              value={shortDesc}
              onChange={(event) => { setShortDesc(event.target.value); }}
              placeholder={'Short description'}
            />
        </div>
      </Form.Item>
      <Form.Item
        initialValue={slug ? context.data.viewArticle.body : undefined}
        name="body"
        rules={[
          {
            required: true,
            message: 'Please input your title!',
            whitespace: true,
          },
        ]}
      >
        <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>Text</label>
            <Input.TextArea
              value={text}
              onChange={(event) => { setText(event.target.value); }}
              placeholder={'some text'}
            />
        </div>
      </Form.Item>
      {<TagForm tags={tags} addTag={addTag} removeTag={removeTag}/>}
      <Form.Item>
        <div className={styles.sendButtonContainer}>
            <Button className={styles.sendButton} type="primary" htmlType="submit">
             Save
            </Button>
        </div>
      </Form.Item>
    </Form>
    </div>
</div>;
};

const TagForm = ({ tags, addTag, removeTag }) => {
  const [newTagName, setNewTagName] = useState('');
  return (<div className={styles.TagForm}>
    {
    tags.map((name) => <div key={name} className={styles.tagContainer}>
        <p className={styles.tag}>{`${name}`}</p>
        <button
          type='button'
          onClick={() => { removeTag(name); }}
          className={styles.deleteTagButton}
        >
          Delete
        </button>
        </div>)
    }
    <div>
      <input
        maxLength='20'
        className={styles.newTag}
        value={newTagName}
        onChange={(event) => { setNewTagName(event.target.value); }}
      />
      <button
        type='button'
        onClick={() => { setNewTagName(''); }}
        className={styles.deleteTagButton}
      >
        Delete
      </button>
      <button
        type='button'
        className={styles.addTagButton}
        onClick={() => {
          addTag(newTagName);
          setNewTagName('');
        }}
      >
        Add tag
      </button>
    </div>
</div>);
};
export default ArticleInitPage;
