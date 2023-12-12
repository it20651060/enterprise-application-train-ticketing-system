package com.sliit.ead;

import static com.sliit.ead.local.localIpAddress;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.DefaultRetryPolicy;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.sliit.ead.Model.Reservation;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class EditReservation extends AppCompatActivity {

    Reservation reservation;
    Button submit;
    Spinner spinner;
    EditText date,time,start,end,price,noOfTicket,total;
    String spinnerSelectedValue = "";
    List<Item_Spinner> spinnerItems;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_reservation);
        SharedPreferences preferences = getSharedPreferences("user_data", Context.MODE_PRIVATE);

        spinner = findViewById(R.id.resDataTrain);
        date = findViewById(R.id.resDataDate);
        time = findViewById(R.id.resDataTime);
        start = findViewById(R.id.resDataStart);
        end = findViewById(R.id.resDataEnd);
        price = findViewById(R.id.resDataPrice);
        noOfTicket = findViewById(R.id.resDataNoOfTicket);
        total = findViewById(R.id.resDataTotal);

        submit = findViewById(R.id.resDataBtn);

        submit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(!(spinner.getSelectedItemPosition()==0)){
                    if(!(noOfTicket.getText().toString().equals("")||noOfTicket.getText().toString().equals(null))){
                        if(!(total.getText().toString().equals("")||total.getText().toString().equals(null))){

                            String url = localIpAddress+"api/Ticket/"+reservation.getId();

                            StringRequest sr = new StringRequest(Request.Method.PUT, url,
                                    new Response.Listener<String>() {
                                        @Override
                                        public void onResponse(String response) {
                                            clearData();
                                            Toast.makeText(EditReservation.this,response,Toast.LENGTH_LONG).show();
                                            startActivity(new Intent(EditReservation.this,BookList.class));
                                        }
                                    }, new Response.ErrorListener() {
                                @Override
                                public void onErrorResponse(VolleyError error) {

                                    System.out.println(error);
                                }
                            }) {
                                @Override
                                public byte[] getBody() throws AuthFailureError {
                                    JSONObject postData = new JSONObject();
                                    try {
                                        postData.put("id", reservation.getId());
                                        postData.put("trainId", spinnerSelectedValue);
                                        postData.put("date", date.getText().toString());
                                        postData.put("time", time.getText().toString());
                                        postData.put("start", start.getText().toString());
                                        postData.put("end",  end.getText().toString());
                                        postData.put("price", price.getText().toString());
                                        postData.put("noOfTicket", noOfTicket.getText().toString());
                                        postData.put("userId", preferences.getString("id", null));
                                        postData.put("total", total.getText().toString());
                                    } catch (JSONException e) {
                                        e.printStackTrace();
                                    }

                                    System.out.println(postData);
                                    return postData.toString().getBytes();
                                }

                                @Override
                                public String getBodyContentType() {
                                    return "application/json";
                                }
                            };
                            RequestQueue requestQueue= Volley.newRequestQueue(EditReservation.this);
                            sr.setRetryPolicy(new DefaultRetryPolicy(
                                    50000,
                                    DefaultRetryPolicy.DEFAULT_MAX_RETRIES,
                                    DefaultRetryPolicy.DEFAULT_BACKOFF_MULT));
                            requestQueue.add(sr);

                        }else{
                            Toast.makeText(EditReservation.this,"Total Price Calculation Error!",Toast.LENGTH_LONG).show();
                        }
                    }else{
                        Toast.makeText(EditReservation.this,"Required No Of Ticket!",Toast.LENGTH_LONG).show();
                    }
                }else{
                    Toast.makeText(EditReservation.this,"Select Train!",Toast.LENGTH_LONG).show();
                }

            }
        });

        noOfTicket.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence charSequence, int start, int before, int count) {
                if(!noOfTicket.getText().toString().equals("")) {
                    if (!price.getText().toString().equals("")) {
                        if (Double.parseDouble(price.getText().toString()) > 0) {
                            if (Integer.parseInt(noOfTicket.getText().toString()) <= 4) {
                                double value = Double.parseDouble(price.getText().toString()) * Integer.parseInt(noOfTicket.getText().toString());
                                total.setText(String.valueOf(value));
                            } else {
                                noOfTicket.setText("4");
                                double value = Double.parseDouble(price.getText().toString()) * 4;
                                total.setText(String.valueOf(value));
                            }
                        }
                    }
                }else{
                    total.setText("0");
                }
            }

            @Override
            public void afterTextChanged(Editable editable) {
                if(!noOfTicket.getText().toString().equals("")) {
                    if (!price.getText().toString().equals("")) {
                        if (Double.parseDouble(price.getText().toString()) > 0) {
                            if (Integer.parseInt(noOfTicket.getText().toString()) <= 4) {
                                double value = Double.parseDouble(price.getText().toString()) * Integer.parseInt(noOfTicket.getText().toString());
                                total.setText(String.valueOf(value));
                            } else {
                                noOfTicket.setText("4");
                                double value = Double.parseDouble(price.getText().toString()) * 4;
                                total.setText(String.valueOf(value));
                            }
                        }
                    }
                }else{
                    total.setText("0");
                }
            }

        });

        final String[] url = {localIpAddress + "api/Train"};

        StringRequest sr = new StringRequest(Request.Method.GET, url[0],
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        spinnerItems = new ArrayList<>();

                        try {
                            JSONArray jsonArray = new JSONArray(response);

                            spinnerItems.add(new Item_Spinner("Select Train", ""));

                            for (int i = 0; i < jsonArray.length(); i++) {
                                JSONObject jsonObject = jsonArray.getJSONObject(i);
                                spinnerItems.add(new Item_Spinner("Train Number: "+jsonObject.getString("tNumber")+" Start : "+jsonObject.getString("start")+" End : "+jsonObject.getString("end"), jsonObject.getString("id")));
                            }

                            ArrayAdapter<Item_Spinner> adapter = new ArrayAdapter<>(EditReservation.this, android.R.layout.simple_spinner_item, spinnerItems);
                            adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);

                            spinner.setAdapter(adapter);

                            Intent intent = getIntent();

                            reservation = (Reservation) intent.getSerializableExtra("Reservation");

                            date.setText(reservation.getDate());
                            time.setText(reservation.getTime());
                            noOfTicket.setText(reservation.getNoOfTicket());
                            price.setText(reservation.getPrice());
                            total.setText(reservation.getTotal());
                            start.setText(reservation.getStart());
                            end.setText(reservation.getEnd());
                            setSpinner(reservation.getTrainId());

                        } catch (JSONException e) {
                            throw new RuntimeException(e);
                        }
                        System.out.println(response);
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
        RequestQueue requestQueue= Volley.newRequestQueue(EditReservation.this);
        sr.setRetryPolicy(new DefaultRetryPolicy(
                50000,
                DefaultRetryPolicy.DEFAULT_MAX_RETRIES,
                DefaultRetryPolicy.DEFAULT_BACKOFF_MULT));
        requestQueue.add(sr);

        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parentView, View selectedItemView, int position, long id) {
                Item_Spinner selectedSpinnerItem = (Item_Spinner) parentView.getItemAtPosition(position);

                String selectedValue = selectedSpinnerItem.getValue();

                if(!selectedValue.equals("")){

                    spinnerSelectedValue = selectedValue;

                    String url = localIpAddress+"api/Train/"+selectedValue;

                    StringRequest sr = new StringRequest(Request.Method.GET, url,
                            new Response.Listener<String>() {
                                @Override
                                public void onResponse(String response) {

                                    try {
                                        JSONObject jsonObject = new JSONObject(response);

                                        System.out.println(jsonObject);

                                        date.setText(jsonObject.getString("date"));
                                        time.setText(jsonObject.getString("time"));
                                        start.setText(jsonObject.getString("start"));
                                        end.setText(jsonObject.getString("end"));
                                        price.setText(jsonObject.getString("price"));

                                    } catch (JSONException e) {
                                        throw new RuntimeException(e);
                                    }
                                    System.out.println(response);
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
                    RequestQueue requestQueue= Volley.newRequestQueue(EditReservation.this);
                    sr.setRetryPolicy(new DefaultRetryPolicy(
                            50000,
                            DefaultRetryPolicy.DEFAULT_MAX_RETRIES,
                            DefaultRetryPolicy.DEFAULT_BACKOFF_MULT));
                    requestQueue.add(sr);
                }

            }

            @Override
            public void onNothingSelected(AdapterView<?> parentView) {
                // Handle the case where nothing is selected, if needed
            }
        });

    }

    private void setSpinner(String value){
        int positionToSelect = 0;
        for (int i = 0; i < spinnerItems.size(); i++) {
            if (spinnerItems.get(i).getValue().equals(value)) {
                positionToSelect = i;
                break;
            }
        }

        spinner.setSelection(positionToSelect);
    }

    private void clearData(){
        date.setText("");
        time.setText("");
        noOfTicket.setText("");
        price.setText("");
        total.setText("");
        start.setText("");
        end.setText("");
        spinner.setSelection(0);
    }
}