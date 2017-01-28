package khan.shadik.mongoarticle.adapter;

import android.content.Context;
import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import java.util.List;

import khan.shadik.mongoarticle.R;
import khan.shadik.mongoarticle.model.PostItemModel;

/**
 * Created by Shadik on 1/28/2017.
 */

public class PostItemAdapter extends RecyclerView.Adapter<PostItemAdapter.ViewHolder> {

    private Context context;
    private List<PostItemModel> data;

    public PostItemAdapter(Context context, List<PostItemModel> data) {
        this.context = context;
        this.data = data;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        CardView v = (CardView) LayoutInflater.from(parent.getContext()).inflate(R.layout.item_post, parent, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, final int position) {
        PostItemModel value = data.get(position);
        holder.postTitle.setText(value.getTitle());
        holder.postDescription.setText(value.getDescription());
        holder.postAuthor.setText("By: " + value.getAuthorName());
        holder.postLikes.setText("Like: " +value.getRecommendation());
        holder.postComments.setText("Comm: " + value.getComments().size());

        holder.root.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Toast.makeText(context, "Clicked @ " + position, Toast.LENGTH_LONG).show();
            }
        });
    }


    @Override
    public int getItemCount() {
        return data.size();
    }

    public void addAll(List<PostItemModel> list) {
        if (list.size() > 0) {
            data.clear();
            data.addAll(list);
            notifyDataSetChanged();
        }
    }


    public static class ViewHolder extends RecyclerView.ViewHolder {

        private TextView postTitle;
        private TextView postDescription;
        private TextView postLikes;
        private TextView postAuthor;
        private TextView postComments;
        private CardView root;

        public ViewHolder(View view) {
            super(view);
            postTitle = (TextView) view.findViewById(R.id.tv_title);
            postDescription = (TextView) view.findViewById(R.id.tv_description);
            postLikes = (TextView) view.findViewById(R.id.tv_like);
            postAuthor = (TextView) view.findViewById(R.id.tv_author);
            postComments = (TextView) view.findViewById(R.id.tv_comment);
            root = (CardView) view.findViewById(R.id.card_view);
        }
    }
}
