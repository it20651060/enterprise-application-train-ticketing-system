package com.sliit.ead;

import static com.sliit.ead.local.localIpAddress;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.android.volley.DefaultRetryPolicy;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.sliit.ead.Model.Reservation;

import java.util.ArrayList;

public class ReservationAdapter  extends RecyclerView.Adapter<ReservationAdapter.holder> {

    private ArrayList<Reservation> res;
    private Context context;

    public ReservationAdapter(ArrayList<Reservation> res){
        this.res = res;
    }

    @NonNull
    @Override
    public ReservationAdapter.holder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        context = parent.getContext();
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.book_one_data,parent,false);

        return new holder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ReservationAdapter.holder holder, int position) {

        holder.date.setText("Date : "+res.get(position).getDate());
        holder.time.setText("Time : "+res.get(position).getTime());
        holder.price.setText("Ticket Price : "+res.get(position).getPrice());
        holder.start.setText("Start Station : "+res.get(position).getStart());
        holder.end.setText("End Station : "+res.get(position).getEnd());
        holder.total.setText("Total Price : "+res.get(position).getTotal());
        holder.noOfTicket.setText("No Of Ticket : "+res.get(position).getNoOfTicket());

        int id =position;

        holder.edit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent i = new Intent(view.getContext(), EditReservation.class);
                i.putExtra("Reservation", res.get(id));
                view.getContext().startActivity(i);
            }
        });


        holder.delete.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                AlertDialog.Builder builder=new AlertDialog.Builder(context);
                builder.setTitle("Delete Res");
                builder.setMessage("Delete...?");

                builder.setPositiveButton("Yes", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {

                        System.out.println(res.get(id).getId());
                        String url = localIpAddress+"api/Ticket/"+res.get(id).getId();

                        StringRequest sr = new StringRequest(Request.Method.DELETE, url,
                                new Response.Listener<String>() {
                                    @Override
                                    public void onResponse(String response) {
                                        Toast.makeText(context,"Delete Successful!",Toast.LENGTH_LONG).show();
                                        res.remove(id);
                                        notifyItemRemoved(id);
                                        notifyDataSetChanged();
                                    }
                                }, new Response.ErrorListener() {
                            @Override
                            public void onErrorResponse(VolleyError error) {

                                System.out.println(error);
                            }
                        }) {
                            @Override
                            public String getBodyContentType() {
                                return "application/json";
                            }
                        };
                        RequestQueue requestQueue= Volley.newRequestQueue(context);
                        sr.setRetryPolicy(new DefaultRetryPolicy(
                                50000,
                                DefaultRetryPolicy.DEFAULT_MAX_RETRIES,
                                DefaultRetryPolicy.DEFAULT_BACKOFF_MULT));
                        requestQueue.add(sr);
                    }
                });

                builder.setNegativeButton("No", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {

                    }
                });

                builder.show();
            }
        });
    }

    @Override
    public int getItemCount() {
        return this.res.size();
    }

    class holder extends RecyclerView.ViewHolder
    {
        ImageView edit,delete;
        TextView date,time,start,end,price,noOfTicket,total;
        public holder(View itemView)
        {
            super(itemView);
            date=(TextView)itemView.findViewById(R.id.res_edit_date);
            time=(TextView)itemView.findViewById(R.id.res_edit_time);
            start=(TextView)itemView.findViewById(R.id.res_edit_start);
            end=(TextView)itemView.findViewById(R.id.res_edit_end);
            price=(TextView)itemView.findViewById(R.id.res_edit_price);
            noOfTicket=(TextView)itemView.findViewById(R.id.res_edit_noOfTicket);
            total=(TextView)itemView.findViewById(R.id.res_edit_total);

            edit=(ImageView)itemView.findViewById(R.id.res_edit_btn);
            delete=(ImageView)itemView.findViewById(R.id.res_delete_btn);
        }
    }
}