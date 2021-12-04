import produce from 'immer';
import { REMOVE_POST_SUCCESS } from './postAdd';

//  더미데이터
// export const generateDummyPost = (number) =>
//   Array(number)
//     .fill()
//     .map((v, i) => ({
//       id: 'v.bo_no',
//       User: {
//         id: 'v.bo_writer',
//         nickname: 'v.mem_nickname',
//       },
//       content: 'v.bo_content',
//       Likers: [],

//       Images: [],
//       Comments: [],
//       data: 'v.bo_date',
//     }));

export const initialState = {
  mainPosts: [],

  addCommentLoading: false, // 댓글달기
  addCommentDone: false,
  addCommentError: null,
  removeCommentLoading: false, // 댓글 삭제
  removeCommentDone: false,
  removeCommentError: null,
  addCommentReplyLoading: false, // 댓글의 답글 달기
  addCommentReplyDone: false,
  addCommentReplyError: null,
  removeCommentReplyLoading: false, // 댓글의 답글 삭제
  removeCommentReplyDone: false,
  removeCommentReplyError: null,
  likePostLoading: false, // 좋아요
  likePostDone: false,
  likePostError: null,
  unLikePostLoading: false, // 좋아요 취소
  unLikePostDone: false,
  unLikePostError: null,
  savePostLoading: false, // 게시물 저장
  savePostDone: false,
  savePostError: null,
  unSavePostLoading: false, // 게시물 저장취소
  unSavePostDone: false,
  unSavePostError: null,

  loadPostsLoading: false, // 게시물 가져오기
  loadPostsDone: false,
  loadPostsError: null,
  loadPostFalid: true,

  loadPostMoreFalid: true,
  pageNumber: 2, // 게시글 넘버 업데이트

  loginNotConnected: false,
};

export const generateDummyPost = (list, listImg) =>
  list.map((v, i) => ({
    id: v.bo_no,
    User: {
      id: v.bo_writer,
      nickname: v.mem_nickname,
      profileImg: v.mem_profileimg,
    },
    content: v.bo_content,
    Likers: [],
    Images: listImg.filter((listImg) => {
      if (v.bo_no === listImg.bo_no) {
        return {
          id: listImg.bo_img_no,
          url: `${listImg.bo_img_location}`,
        };
      }
    }),
    liked: { id: v.goodChk },
    saved: { id: v.saveChk },
    likedNumber: v.goodCnt,
    Comments: [],
    date: v.bo_date,
  }));

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE';

export const ADD_COMMENT_REPLY_REQUEST = 'ADD_COMMENT_REPLY_REQUEST';
export const ADD_COMMENT_REPLY_SUCCESS = 'ADD_COMMENT_REPLY_SUCCESS';
export const ADD_COMMENT_REPLY_FAILURE = 'ADD_COMMENT_REPLY_FAILURE';

export const REMOVE_COMMENT_REPLY_REQUEST = 'REMOVE_COMMENT_REPLY_REQUEST';
export const REMOVE_COMMENT_REPLY_SUCCESS = 'REMOVE_COMMENT_REPLY_SUCCESS';
export const REMOVE_COMMENT_REPLY_FAILURE = 'REMOVE_COMMENT_REPLY_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const SAVE_POST_REQUEST = 'SAVE_POST_REQUEST';
export const SAVE_POST_SUCCESS = 'SAVE_POST_SUCCESS';
export const SAVE_POST_FAILURE = 'SAVE_POST_FAILURE';

export const UNSAVE_POST_REQUEST = 'UNSAVE_POST_REQUEST';
export const UNSAVE_POST_SUCCESS = 'UNSAVE_POST_SUCCESS';
export const UNSAVE_POST_FAILURE = 'UNSAVE_POST_FAILURE';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCES';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const LOAD_MORE_POSTS_REQUEST = 'LOAD_MORE_POSTS_REQUEST';
export const LOAD_MORE_POSTS_SUCCESS = 'LOAD_MORE_POSTS_SUCCES';
export const LOAD_MORE_POSTS_FAILURE = 'LOAD_MORE_POSTS_FAILURE';

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      // 게시물 삭제
      case REMOVE_POST_SUCCESS:
        draft.mainPosts = draft.mainPosts = draft.mainPosts.filter(
          (v) => v.id !== action.data.postId,
        );
        break;

      // 댓글달기
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        post.Comments.push(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        draft.addCommentError = null;
        break;
      }
      case ADD_COMMENT_FAILURE:
        draft.addCommentDone = false;
        draft.addCommentError = action.error;
        break;
      // 댓글 삭제
      case REMOVE_COMMENT_REQUEST:
        draft.removeCommentLoading = true;
        draft.removeCommentDone = false;
        draft.removeCommentError = null;
        break;
      case REMOVE_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        const postnum = draft.mainPosts.findIndex(
          (v) => v.id === action.data.postId,
        );
        draft.mainPosts[postnum].Comments = post.Comments.filter(
          (v) => v.commentId !== action.data.commentId,
        );
        draft.removeCommentLoading = false;
        draft.removeCommentDone = true;
        draft.removeCommentError = null;

        break;
      }
      case REMOVE_COMMENT_FAILURE:
        draft.removeCommentDone = false;
        draft.removeCommentError = action.error;
        break;

      // 댓글의 답글달기
      case ADD_COMMENT_REPLY_REQUEST:
        draft.addCommentReplyLoading = true;
        draft.addCommentReplyDone = false;
        draft.addCommentReplyError = null;
        break;
      case ADD_COMMENT_REPLY_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        post.Comments.find(
          (v) => v.commentId === action.data.commentId,
        ).Comments.push(action.data);

        draft.addCommentReplyLoading = false;
        draft.addCommentReplyDone = true;
        draft.addCommentReplyError = null;
        break;
      }
      case ADD_COMMENT_REPLY_FAILURE:
        draft.addCommentReplyDone = false;
        draft.addCommentReplyError = action.error;
        break;
      // 댓글의 답글 삭제
      case REMOVE_COMMENT_REPLY_REQUEST:
        draft.removeCommentReplyLoading = true;
        draft.removeCommentReplyDone = false;
        draft.removeCommentReplyError = null;
        break;
      case REMOVE_COMMENT_REPLY_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        const postNum = draft.mainPosts.findIndex(
          (v) => v.id === action.data.postId,
        );
        const postCommentNum = post.Comments.findIndex(
          (v) => v.commentId === action.data.commentId,
        );
        draft.mainPosts[postNum].Comments[postCommentNum].Comments =
          post.Comments[postCommentNum].Comments.filter(
            (v) => v.commentReplyId !== action.data.commentReplyId,
          );
        draft.removeCommentReplyLoading = false;
        draft.removeCommentReplyDone = true;
        draft.removeCommentReplyError = null;
        break;
      }
      case REMOVE_COMMENT_REPLY_FAILURE:
        draft.removeCommentReplyDone = false;
        draft.removeCommentReplyError = action.error;
        break;

      // 좋아요
      case LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
      case LIKE_POST_SUCCESS: {
        if (action.data.result === 'OK') {
          const post = draft.mainPosts.find(
            (v) => v.id === action.data.goodVO.bo_no,
          );
          if (post) {
            post.liked.id = action.data.goodVO.mem_id;
            post.likedNumber = post.likedNumber + 1;
          }
          draft.likePostLoading = false;
          draft.likePostDone = true;
        } else if (action.data.result === 'NOTCONNECTED') {
          draft.likePostLoading = false;
          draft.likePostDone = false;
          alert('로그인후 이용해주세요.');
          draft.loginNotConnected = true;
        }
        break;
      }
      case LIKE_POST_FAILURE:
        draft.likePostDone = false;
        draft.likePostError = action.error;
        break;

      // 좋아요 취소
      case UNLIKE_POST_REQUEST:
        draft.unLikePostLoading = true;
        draft.unLikePostDone = false;
        draft.unLikePostError = null;
        break;
      case UNLIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find(
          (v) => v.id === action.data.goodVO.bo_no,
        );
        if (post) {
          post.liked.id = null;
          post.likedNumber = post.likedNumber - 1;
        }
        draft.unLikePostLoading = false;
        draft.unLikePostDone = true;
        draft.unLikePostError = null;
        break;
      }
      case UNLIKE_POST_FAILURE:
        draft.unLikePostDone = false;
        draft.unLikePostError = action.error;
        break;

      // 게시물 저장하기
      case SAVE_POST_REQUEST:
        draft.savePostLoading = true;
        draft.savePostDone = false;
        draft.savePostError = null;
        break;
      case SAVE_POST_SUCCESS: {
        if (action.data.result === 'OK') {
          const post = draft.mainPosts.find(
            (v) => v.id === action.data.boardVO.bo_no,
          );
          if (post) {
            post.saved.id = action.data.boardVO.mem_id;
          }
          draft.savePostLoading = false;
          draft.savePostDone = true;
          // draft.me.Saved.push({ id: action.data.boardVO.bo_no });
        } else if (action.data.result === 'NOTCONNECTED') {
          draft.savePostLoading = false;
          draft.savePostDone = false;
          alert('로그인후 이용해주세요!');
        }

        break;
      }
      case SAVE_POST_FAILURE:
        draft.savePostDone = false;
        draft.savePostError = action.error;
        break;
      // 게시물 저장하기 취소
      case UNSAVE_POST_REQUEST:
        draft.unSavePostLoading = true;
        draft.unSavePostDone = false;
        draft.unSavePostError = null;
        break;
      case UNSAVE_POST_SUCCESS: {
        const post = draft.mainPosts.find(
          (v) => v.id === action.data.boardVO.bo_no,
        );
        if (post) {
          post.saved.id = null;
        }
        draft.unSavePostLoading = false;
        draft.unSavePostDone = true;
        draft.unSavePostError = null;
        break;
      }
      case UNSAVE_POST_FAILURE:
        draft.unSavePostDone = false;
        draft.unSavePostError = action.error;
        break;

      // 게시물 가져오기
      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        draft.loadPostFalid = false;

        break;
      case LOAD_POSTS_SUCCESS:
        if (action.data.result === 'SUCCESS') {
          draft.loadPostsLoading = false;
          draft.loadPostsDone = true;
          draft.loadPostFalid = true;

          draft.loadPostMoreFalid = true;
          draft.pageNumber = 2;
          draft.mainPosts = generateDummyPost(
            action.data.list,
            action.data.imgList,
          );
        } else if (action.data.result === 'NOTEXIST') {
          draft.loadPostsLoading = false;
          draft.loadPostsDone = false;
          draft.loadPostFalid = false;
        } else {
          draft.loadPostsLoading = false;
          draft.loadPostsDone = false;
          draft.loadPostFalid = false;
        }
        break;
      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;

      // 게시물 더 가져오기
      case LOAD_MORE_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case LOAD_MORE_POSTS_SUCCESS:
        if (action.data.result === 'SUCCESS') {
          draft.loadPostsLoading = false;
          draft.loadPostsDone = true;
          draft.loadPostMoreFalid = true;
          draft.pageNumber = draft.pageNumber + 1;
          draft.mainPosts = draft.mainPosts.concat(
            generateDummyPost(action.data.list, action.data.imgList),
          );
        } else if (action.data.result === 'NOTEXIST') {
          draft.loadPostsLoading = false;
          draft.loadPostsDone = false;
          draft.loadPostMoreFalid = false;
        } else {
          draft.loadPostsLoading = false;
          draft.loadPostsDone = false;
          draft.loadPostMoreFalid = false;
        }
        break;
      case LOAD_MORE_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;

      default:
        break;
    }
  });
};

export default reducer;