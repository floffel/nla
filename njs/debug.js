function isHeaderNan() {
  var args = Object.values(arguments);

  for(var i=0; i<args.length; i++) { 
    if(!args[i] || args[i] === '') {
      return true;
    }
  }

  return false;
}

function ObjectToString(o) {
  var out = "";
  for(var j in o) {
    out += j + ": " + o[j]
  }
  return out;
}

function hello(r) {
    r.status = 200;
    //r.headersOut.foo = 1234;
    r.headersOut['Content-Type'] = "text/plain; charset=utf-8";
    r.headersOut['Content-Length'] = 15;
    r.sendHeader();
    r.send("nginx");
    r.send("script");
    r.finish();
}

// function for debugging purposes
function printHeaders(r) {
  r.status = 200;
  r.headersOut['Content-Type'] = "text/plain; charset=utf-8";
  var out = "";

// see https://github.com/nginx/njs/issues/192#issuecomment-509598730
  for (var h in r.headersIn) {
    var key = h;
    var val = r.headersIn[h];
    r.headersOut[key] = val;
    out += key + ": " + val + "<br>";
  }

  r.headersOut['Content-Length'] = out.length;
  r.sendHeader();
  r.send(out);
  r.finish();
}

function test(r) {
  r.status = 200;
  r.headersOut['Content-Type'] = "text/plain; charset=utf-8";

  r.error('before subrequest');

  r.subrequest('/hello', '', function(c) {
    r.error('inside subrequest');
    r.error("status: "  + c.status);
    var out = c.status;
    r.headersOut['Content-Length'] = out.length;
    r.sendHeader();

    r.send(out);
    r.finish();
  });

  r.error('after subrequest');
}
