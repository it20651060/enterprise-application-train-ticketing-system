package com.sliit.ead;

import static com.sliit.ead.local.localIpAddress;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.sliit.ead.Model.Reservation;

import org.json.JSONArray;
import org.json.JSONException;

import java.util.ArrayList;

public class BookList extends AppCompatActivity {

    private RecyclerView recview;
    private ReservationAdapter reservationAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_book_list);

        ArrayList<Reservation> allStation=new ArrayList<Reservation>();
        SharedPreferences preferences = getSharedPreferences("user_data", Context.MODE_PRIVATE);

        String url = localIpAddress+"api/Ticket/user/"+preferences.getString("id", null);

        StringRequest sr = new StringRequest(Request.Method.GET, url, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                try {
                    JSONArray obj = new JSONArray(response);

                    try {
                        for (int i=0, l=obj.length(); i<l; i++){
                            allStation.add(new Reservation(obj.getJSONObject(i).getString("id"),obj.getJSONObject(i).getString("date"),obj.getJSONObject(i).getString("time"),obj.getJSONObject(i).getString("price"),obj.getJSONObject(i).getString("noOfTicket"),obj.getJSONObject(i).getString("start"),obj.getJSONObject(i).getString("end"),obj.getJSONObject(i).getString("trainId"),obj.getJSONObject(i).getString("total")));
                        }

                        recview=(RecyclerView) findViewById(R.id.recyclerview);
                        recview.setLayoutManager(new LinearLayoutManager(BookList.this));

                        reservationAdapter = new ReservationAdapter(allStation);

                        reservationAdapter.notifyDataSetChanged();
                        recview.setAdapter(reservationAdapter);
                    } catch (JSONException e) {}

                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println(error.toString());
            }
        });

        RequestQueue requestQueue= Volley.newRequestQueue(BookList.this);
        requestQueue.add(sr);
    }
}